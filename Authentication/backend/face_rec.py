import face_recognition
import dlib
import numpy as np
from PIL import Image, ImageDraw
import os
import io
import base64

class FaceRec:
    def __init__(self, known_person_path_file, unknown_images_path_file, known_name=None):
        self.known_person_path_file = known_person_path_file
        self.unknown_images_path_file = unknown_images_path_file
        self.known_name = known_name

    def convertedKnownImage(self):
        return face_recognition.load_image_file(self.known_person_path_file)

    def recognizeFaces(self):

        for file in os.listdir(self.unknown_images_path_file):
            if file[0] != '.':
                known_image = self.convertedKnownImage()
                known_image_encoding = face_recognition.face_encodings(known_image)[0]
                known_face_encodings = [known_image_encoding]
                known_face_names = [self.known_name]

                unknown_image = face_recognition.load_image_file(self.unknown_images_path_file + '/' + file)

                face_locations = face_recognition.face_locations(unknown_image)
                face_encodings =  face_recognition.face_encodings(unknown_image, face_locations)
                
                for (top, right, bottom, left), face_encodings in zip(face_locations, face_encodings):
                    matches = face_recognition.compare_faces(known_face_encodings, face_encodings)
                    name = "Nobody"

                    face_distances = face_recognition.face_distance(known_face_encodings, face_encodings)
                    bestMatchIndex = np.argmin(face_distances)

                    if matches[bestMatchIndex]:
                        name = known_face_names[bestMatchIndex]

                        return name
                    
                    return name

#known faces 
harry = FaceRec('C:/Users/Miran/demos/React-Flask/flask-server/BasicImages/Harry.jpg', '')
zayn = FaceRec('C:/Users/Miran/demos/React-Flask/flask-server/BasicImages/zayn2.jpg', '')
