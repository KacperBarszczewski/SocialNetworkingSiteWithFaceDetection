from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from mtcnn import MTCNN
import numpy as np
import base64

app = Flask(__name__)
CORS(app, origins="*")

def detect_faces(image):
    detector = MTCNN()
    faces = detector.detect_faces(image)

    return faces

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.json:
        return jsonify({'error': 'Brak zdjęcia'}), 400

    image_data = request.json['image']
    if not image_data.startswith('data:image'):
        return jsonify({'error': 'Zły format zdjęcia'}), 400

    # Usunięcie nagłówka "data:image/png;base64,"
    base64_img = image_data.split('base64,')[1]

    # Dekodowanie obrazu z base64
    img_bytes = base64.b64decode(base64_img)
    img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)

    try:
        faces = detect_faces(img)

        if faces:
            return jsonify({'error': 'Blokada, ponieważ znaleziono twarz na zdjęciu'}), 400
        else:
            return jsonify({'message': 'Nie znaleziono twarzy'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)