
//initializing firebase API to console

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBcsFps3uTX1Cszjjb_2iR8rYXwsNfCluU",
    authDomain: "smartmedx-c7cc0.firebaseapp.com",
    projectId: "smartmedx-c7cc0",
    storageBucket: "smartmedx-c7cc0.appspot.com",
    messagingSenderId: "146563663043",
    appId: "1:146563663043:web:51e6edbe9c3ff937f30e76",
    measurementId: "G-W6JHYSLNZF"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();

export { storage, firebase as default };