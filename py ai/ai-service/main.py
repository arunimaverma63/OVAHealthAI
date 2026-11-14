from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import requests
import uuid
# from google import genai as genai
from pydantic import BaseModel
from typing import List,Optional

#IMPORT YOUR UTIL MODULES(V.IMP)
from utils.usg_predictor import predict_ultrasound
from utils.clinical_predictor import predict_clinical

app = FastAPI()

# 1. ENABLE CORS (Required for Frontend -> Backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 2. CONFIGURE GOOGLE GEMINI API KEY
# Paste your key here or set GEMINI_API_KEY environment variable
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GOOGLE_GEMINI_API_KEY_HERE")
# 3. SPECIALIZED MEDICAL SYSTEM PROMPT
PCOS_MEDICAL_SYSTEM_INSTRUCTION = """
You are OVAHealth AI's specialized Clinical PCOS & PMOS Assistant.
You have expertise in:
- Polycystic Ovary Syndrome (PCOS) & Polyendocrine Metabolic Ovarian Syndrome (PMOS).
- Rotterdam 2003 diagnostic criteria (Ovulatory dysfunction, Hyperandrogenism, Ultrasound morphology).
- The 4 PCOS phenotypes: Insulin-Resistant, Post-Pill, Inflammatory, and Adrenal PCOS.
- Ultrasound markers (follicles >=12, peripheral 'string of pearls', enlarged stromal volume).
- Nutrition (low-glycemic, anti-inflammatory, 30g+ fiber), strength training, and supplements (40:1 Myo/D-chiro inositol, Vitamin D3, Omega-3).
Guidelines:
1. Provide accurate, clear, and empathetic clinical guidance.
2. Use bullet points and bold highlights for readable answers.
3. Keep answers concise and patient-friendly.
4. Conclude with a brief reminder that this is educational guidance and not a replacement for their doctor's clinical diagnosis.
"""
# 4. CHAT REQUEST MODELS
class MessageItem(BaseModel):
    role: str   # 'user' or 'model'
    text: str
class ChatPayload(BaseModel):
    message: str
    history: Optional[List[MessageItem]] = []
# 5. NEW /chat ENDPOINT POWERED BY GOOGLE GEMINI
@app.post("/chat")
async def chat_with_medical_llm(payload: ChatPayload):
    try:
        if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GOOGLE_GEMINI_API_KEY_HERE":
            return JSONResponse(
                status_code=400,
                content={"reply": "Please configure your GEMINI_API_KEY in py ai/ai-service/main.py."}
            )
        # Build contents array for Google Gemini
        contents = []
        for msg in payload.history:
            gemini_role = "user" if msg.role == "user" else "model"
            contents.append({
                "role": gemini_role,
                "parts": [{"text": msg.text}]
            })
        
        # Add current user query
        contents.append({
            "role": "user",
            "parts": [{"text": payload.message}]
        })
        # Call Google Gemini 1.5 Flash REST API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        body = {
            "system_instruction": {
                "parts": [{"text": PCOS_MEDICAL_SYSTEM_INSTRUCTION}]
            },
            "contents": contents,
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 800
            }
        }
        response = requests.post(url, json=body, headers=headers, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            candidates = data.get("candidates", [])
            if candidates:
                reply_text = candidates[0]["content"]["parts"][0]["text"]
                return {"reply": reply_text, "status": "success"}
        
        return JSONResponse(
            status_code=response.status_code,
            content={"reply": f"Gemini API Error: {response.text}", "status": "error"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"reply": f"Server error: {str(e)}", "status": "error"}
        )
#FOLDER SETUP
UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR,exist_ok=True)

#HEALTH CHECK
@app.get("/")
def home():
    return{
        "message": "OVAHealth AI Service Running",
        "models": ["CNN (USG)", "XGBoost (Clinical)"]
    }

#ULTRASOUND IMAGE PREDICTION(CNN)
@app.post("/predict-usg")
async def predict_usg(file: UploadFile = File(...)):
    try:
        #1.Create Unique filename
        ext = file.filename.split(".")[-1]
        filename= f"{uuid.uuid4()}.{ext}"
        file_path=os.path.join(UPLOAD_DIR,filename)

        #2.Save uploaded file
        with open(file_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
        
        #3.Call CNN predictor (use preprocesses + model)
        result = predict_ultrasound(file_path)

        #4.Responses
        return JSONResponse(content={
            "type": "USG_IMAGE",
            "filename": filename,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "explanation": result.get("explanation", "")
        })

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error":str(e)}
        )

#CLINICAL DATA PREDICTION (XGBoost)
@app.post("/predict-clinical")
async def predict_clinical_api(
    age: int = Form(...),
    weight: float = Form(...),
    bmi: float = Form(...),
    cycle_length: int = Form(...)
):

    try:
        # 1. Prepare input dictionary
        input_data = {
            "Age": age,
            "Weight": weight,
            "BMI": bmi,
            "Cycle": cycle_length
        }

        # 2. Call XGBoost predictor
        result = predict_clinical(input_data)

        return JSONResponse(content={
            "type": "CLINICAL_DATA",
            "input": input_data,
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        })

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
