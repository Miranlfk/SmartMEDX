import cv2
import numpy as np
import face_recognition
import os

path = 'flask-server\BasicImages'
images = []
MemberName = []
listOfMembers = os.listdir(path)
print(listOfMembers)

for member in listOfMembers:
    curImg = cv2.imread(f'{path}/{member}')
    images.append(curImg)
    MemberName.append(os.path.splitext(member)[0])
    print(MemberName)


def Encodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


encodeListKnown = Encodings(images)
print("Encoding Done")

cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    imgSS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgSS = cv2.cvtColor(imgSS, cv2.COLOR_BGR2RGB)

    faceLocsCurFrame = face_recognition.face_locations(imgSS)
    encodesCurFrame = face_recognition.face_encodings(imgSS, faceLocsCurFrame)

    def RectangleIdentifier():
        y1, x2, y2, x1 = faceLoc
        y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)

    for faceEncode, faceLoc in zip(encodesCurFrame, faceLocsCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, faceEncode)
        faceDis = face_recognition.face_distance(encodeListKnown, faceEncode)
        print(faceDis)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = listOfMembers[matchIndex].upper()
            print(name)
            RectangleIdentifier()

        else:
            name = 'Unauthorized Person'
            RectangleIdentifier()

    cv2.imshow('webcam', img)
    cv2.waitKey(1)