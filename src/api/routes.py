"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")  
    new_user = User(username = username, email = email, password = password)
    db.session.add(new_user)
    db.session.commit()    
    return jsonify(new_user.serialize()), 200

@api.route('/login', methods=['POST', 'GET'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
            return jsonify({"msg": "Bad username or password"}), 401
    #defino tiempo de duracion de token
    time_token = timedelta(minutes = 1)
    access_token = create_access_token(identity=email, expires_delta=time_token)
    return jsonify(access_token = access_token),200

#Acces private route
@api.route('/private',methods =['GET'])    
@jwt_required()
def acces_profile():
    current_user=get_jwt_identity()
    user = User.query.filter_by(email=user_data).first()
    return jsonify({"msg":"acceso permitido"}), 200