from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
app = Flask(__name__)
CORS(app)

# load model + encoders
model = joblib.load("model/model.pkl")
le_outlook = joblib.load("model/le_outlook.pkl")
le_temp = joblib.load("model/le_temp.pkl")
le_humidity = joblib.load("model/le_humidity.pkl")
le_wind = joblib.load("model/le_wind.pkl")
le_play = joblib.load("model/le_play.pkl")
# /Users/gulzarhussain/Desktop/ML projects/naive-bayes/server/model/le_humidity.pkl
@app.route("/", methods=["GET"])
def home():
    return "Server running ✅"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        outlook = le_outlook.transform([data["outlook"]])[0]
        temp = le_temp.transform([data["temp"]])[0]
        humidity = le_humidity.transform([data["humidity"]])[0]
        wind = le_wind.transform([data["wind"]])[0]

        pred = model.predict([[outlook, temp, humidity, wind]])
        result = le_play.inverse_transform(pred)[0]

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)
port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)