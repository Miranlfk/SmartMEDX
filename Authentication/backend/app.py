from flask import Flask, request
from flask_cors import CORS

import _json
from face_rec import FaceRec, harry, zayn
from PIL import Image
import base64
import io
import os
import shutil
import time

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=["POST", "GET"])
def api():
    data = request.get_json()
    response = "Nobody"
    directory = './stranger'
    if data:
        if os.path.exists(directory):
            shutil.rmtree(directory)

        if not os.path.exists(directory):
            try:
                os.mkdir(directory)
                time.sleep(1)
                result = data['data']
                b = bytes(result, 'utf-8')
                image = b[b.find(b'/9'):]
                im = Image.open(io.BytesIO(base64.b64decode(image)))
                im.save(directory+ './stranger.jpeg')

                if harry.recognizeFaces() == 'harry':
                    response = "Harry"

                elif zayn.recognizeFaces() == 'miran':
                    response ="Zayn"

                else:
                    response = "Nobody"

            except:
                pass

    return response
            



if __name__ == '__main__':
    app.run()
