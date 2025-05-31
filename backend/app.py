from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash
import os

app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = "mongodb://localhost:27017/salonesweb"
mongo = PyMongo(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    correo = data.get('correo')
    contraseña = data.get('contraseña')

    if mongo.db.usuarios.find_one({'correo': correo}):
        return jsonify({'message': 'El correo ya está registrado'}), 409

    mongo.db.usuarios.insert_one({
        'nombre': nombre,
        'correo': correo,
        'contraseña': generate_password_hash(contraseña)
    })

    return jsonify({'message': 'Usuario registrado exitosamente'})
