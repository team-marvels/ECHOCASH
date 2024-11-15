from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    return jsonify({"message": "Login successful", "username": username}), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if file:
        evaluation = evaluate_image(file)
        return jsonify({"message": "File uploaded successfully", "evaluation": evaluation}), 200
    return jsonify({"message": "No file uploaded"}), 400
def evaluate_image(file):
    image = Image.open(BytesIO(file.read()))
    image = np.array(image)
    height, width, _ = image.shape
    if width > 1000 and height > 1000:
        waste_quality = "High"
    else:
        waste_quality = "Low"
    return {"waste_quality": waste_quality, "prize_range": "₹8-₹12"}

if __name__ == '__main__':
    app.run(debug=True)
