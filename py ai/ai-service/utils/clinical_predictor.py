import pickle
import pandas as pd

# Load trained XGBoost model
with open("notebooks/best_xgboost_model.pkl", "rb") as file:
    model = pickle.load(file)


def predict_clinical(data):

    input_df = pd.DataFrame([[
        data["Age"],
        data["Weight"],
        data["BMI"],
        data["Cycle"]
    ]], columns=[' Age (yrs)', 'Weight (Kg)', 'BMI', 'Cycle length(days)'])

    prediction = model.predict(input_df)[0]

    probability = float(model.predict_proba(input_df)[0][1])

    if prediction == 1:
        result = "PCOS Detected"
    else:
        result = "Normal"

    return {
        "prediction": result,
        "confidence": round(probability * 100, 2)
    }