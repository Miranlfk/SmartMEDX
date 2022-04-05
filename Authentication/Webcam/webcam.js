import React, {useState} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import './webcam.css';





const WebcamCapture = () => {
    const WebcamRef = React.useRef(null);
    const videoConstraints ={
        width : 3000,
        height : 3000,
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
           <h1 align="center"  >Insurance Agent Verification</h1>

            <Webcam 
              id="webcam"
              objectFit='contain'
              objectPosition='center'
              className="webcam"
              audio = {false}
              height = {400}
              ref = {WebcamRef}
              screenshotFormat = 'image/jpeg'
              width={1550}
              videoConstraints = {videoConstraints}
              
              
            />
            

<br>
</br>
           <center> <button   className="button" border="none"
        color="green" height = "5000px"  width = "200px"  onClick={capture}>Verify</button></center>
            <h2>{name}</h2>
            
        </div>
    );



}

export default WebcamCapture;

