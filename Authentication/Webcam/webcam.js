import React, {useState} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
    const WebcamRef = React.useRef(null);
    const videoConstraints ={
        width : 200,
        height : 300,
        facingMode : 'user'
    };
    const [name, setName] = useState('')
    const capture = React.useCallback(
        () => {
            const imageSrc = WebcamRef.current.getScreenshot();
            console.log(`imageSrc = ${imageSrc}`)
            axios.post('http://127.0.0.1:5000/api',{data:imageSrc})
                .then(res => {
                console.log(`response = ${res}`)
                setName(res.data)
                })
                .catch(error => {
                    console.log(`error = ${error}`)
                })

    },
      [WebcamRef]
    );

    return (
        <div>
            <Webcam
              audio = {false}
              height = {300}
              ref = {WebcamRef}
              screenshotFormat = 'image/jpeg'
              width={350}
              videoConstraints = {videoConstraints}
            />
            <button onClick={capture}>Verify</button>
            <h2>{name}</h2>
        </div>
    );



}

export default WebcamCapture;