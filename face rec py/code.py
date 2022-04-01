import cv2
import numpy as np
import face-recognition


imgAsh = face_recognition.load_image_file('ImageBasic/Ash1.jpg')
imgAsh = cv2.cvtColor(imgAsh,cv2.COLOR_BGR2RGB)
imgTest = face_recognition.load_image_file('ImageBasic/Ash2.jpg')
imgTest = cv2.cvtColor(imgTest,cv2.COLOR_BGR2RGB)

faceLoc = face_recognititon.face_locations(imgAsh)[0]
encodeAsh = face_recognition.face_encodings(imgAsh)[0]
cv2.rectangle(imgAsh,(faceLoc[0],faceLoc[1],faceLoc[2]),(255,0,255),2)

faceLocTest = face_recognititon.face_locations(imgTest)[0]
encodeTest = face_recognition.face_encodings(imgTest)[0]
cv2.rectangle(imgAsh,(faceLocTest[0],faceLocTest[1],faceLocTest[2]),(255,0,255),2)

results = face_recognition.compare_faces([encodeAsh],encodeTest)
faceDis = face_recognition.face_distance([encodeAsh],encodeTest)
print (results,faceDis)
cv2.putText(imgTest,f'{results}{round(faceDis[0],2)}',(50,50),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,255),2)







cv2.imshow('Ashely Green',imgAsh)
cv2.imshow('Ashely test',imgTest)
cv2.waitKey(0)
