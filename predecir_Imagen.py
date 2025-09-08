from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Cargar el modelo previamente entrenado
MODEL_PATH = "modelo.h5"
model = tf.keras.models.load_model(MODEL_PATH)
categories = ['Armadura', 'Arma medieval', 'Escudo']

# Función para preprocesar la imagen
def preprocess_image(image):
    # Convertir la imagen a modo RGB (eliminar transparencia si existe)
    image = image.convert('RGB')
    
    # Convertir a JPG en un buffer
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    buffer.seek(0)
    
    # Redimensionar y normalizar
    image = Image.open(buffer)
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    
    return image


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No se ha subido ningún archivo'}), 400
        
        file = request.files['file']
        
        # Verificar que el archivo sea una imagen
        if file.filename == '':
            return jsonify({'error': 'No se ha seleccionado ningún archivo'}), 400
            
        if not file.content_type.startswith('image/'):
            return jsonify({'error': 'El archivo debe ser una imagen'}), 400
            
        try:
            image = Image.open(io.BytesIO(file.read()))
        except:
            return jsonify({'error': 'No se pudo leer la imagen'}), 400
            
        processed_image = preprocess_image(image)
        predictions = model.predict(processed_image)[0]
        
        results = {categories[i]: float(predictions[i]) for i in range(len(categories))}
        return jsonify(results)
        
    except Exception as e:
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
      