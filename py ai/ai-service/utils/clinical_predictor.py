import pickle
import numpy as np

# Load trained XGBoost model
with open("notebooks/best_xgboost_model.pkl", "rb") as file:
    model = pickle.load(file)


def predict_clinical(data):

    input_data = np.array([[
        data["Age"],
        data["Weight"],
        data["BMI"],
        data["Cycle"]
    ]])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1]

    if prediction == 1:
        result = "PCOS Detected"
    else:
        result = "Normal"

    return {
        "prediction": result,
        "confidence": round(probability * 100, 2)
    }