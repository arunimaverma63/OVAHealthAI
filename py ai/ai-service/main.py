from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import shutil
import os
import uuid

#IMPORT YOUR UTIL MODULES(V.IMP)
from utils.usg_predictor import predict_ultrasound
from utils.clinical_predictor import predict_clinical

app = FastAPI()

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
