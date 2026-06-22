import torch
from tensorflow.keras.models import load_model
from utils.preprocess import preprocess_image
import numpy as np
from transformers import pipeline

model = load_model("model/usg_model.keras")

# Lazily initialized DeepSeek-R1 pipeline
pipe = None

def get_explanation_pipeline():
    global pipe
    if pipe is None:
        print("Initializing DeepSeek-R1 text-generation pipeline...")
        device = 0 if torch.cuda.is_available() else -1
        pipe = pipeline(
            "text-generation",  
            model="deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
            device=device,
            torch_dtype=torch.bfloat16,
            model_kwargs={"low_cpu_mem_usage": True}
        )
    return pipe


def predict_ultrasound(image_path):

    # preprocess image
    processed_image = preprocess_image(image_path)

    # model prediction
    prediction = model.predict(processed_image)

    print("\n==========================")
    print("RAW MODEL OUTPUT:")
    print(prediction)
    print("==========================\n")

    raw_score = float(prediction[0][0])

    # MODEL OUTPUT:
    # 0 = infected
    # 1 = noninfected

    if raw_score < 0.5:

        result = "PCOS Detected"

        confidence = (1 - raw_score) * 100

        prompt = f"""
A pelvic ultrasound scan was analyzed using AI.

Result: PCOS Detected
Confidence: {round(confidence, 2)}%

Explain medically why this scan may indicate PCOS.
Mention follicles, ovarian morphology, and possible hormonal imbalance.
Keep the explanation simple and concise.
"""

    else:

        result = "Normal"

        confidence = raw_score * 100

        prompt = f"""
A pelvic ultrasound scan was analyzed using AI.

Result: Normal
Confidence: {round(confidence, 2)}%

Explain medically why the ovaries appear normal.
Keep the explanation simple and concise.
"""

    # Generate explanation using DeepSeek
    try:
        generator = get_explanation_pipeline()
        response = generator(
            prompt,
            max_new_tokens=250,
            return_full_text=False
        )
        raw_explanation = response[0]["generated_text"]
    except Exception as e:
        print(f"Error generating explanation from model: {e}")
        raw_explanation = "Unable to generate explanation due to an internal error."

    return {
        "prediction": result,
        "confidence": round(confidence, 2),
        "raw_prediction": round(raw_score, 4),
        "explanation": raw_explanation
    }