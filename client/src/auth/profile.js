import React, { useState } from "react"
import { storage } from "../Config/fbConfig"
import '../App.css'


const Profile = () => {
    //using useState hooks to update the image and url states
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleImageChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]); // targeting inputs according to id
        }
    };

    const handleUpload = () => {
        //upload image by making reference path to image on firebase storage
        const uploadTask = storage.ref(`BioMetric/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",

            () => {
                storage
                    .ref("BioMetric")
                    .child(image.name)
                    .getDownloadURL() // getting image referenced URL
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
       
    };
    console.log("image", image)
    return (
        <>
            <div class="center">
                <div class="card-panel hoverable">
                    {/* setting user profile pic placeholder */}
                    <img class="rounded-circle z-depth-2" alt="100x100" src={url || "https://i.pravatar.cc/300"} 
                        data-holder-rendered="true"></img> 

                    <div class="card-panel blue darken-2">
                        
                            <input type="file" onChange={handleImageChange} />
                            <div style={{ paddingLeft: "40px" }}>
                                <button class="btn deep-orange"  onClick={handleUpload}>Upload</button>
                            </div>

                    </div>

                </div>
            </div>
            
        </>
    )
}
export default Profile;