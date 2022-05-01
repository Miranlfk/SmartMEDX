import face_recognition
import cv2
import numpy as np
import os
from flask import *
from flask_cors import CORS
import mysql
import mysql.connector as conn
app = Flask(__name__)
CORS(app)
db = []
known_path = os.path.join(os.getcwd(), "Images/Known_faces/")
unknown_path = os.path.join(os.getcwd(), "Images/Unknown_faces/")
def get_data():
    global db
    con = conn.connect(host='localhost', database='face_rec',user='root', password='', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = 'select * from images'
    cursor.execute(sql)
    result = cursor.fetchall()
    print("sucsessfully connected")
    print(result)
    cursor.close()
    con.close()
get_data()
