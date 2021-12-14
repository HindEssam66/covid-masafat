import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyA0_ZAO3wgRlLdvymaJIyKLEgqfqNtUdvY",
    authDomain: "masafat-332616.firebaseapp.com",
    projectId: "masafat-332616",
    storageBucket: "masafat-332616.appspot.com",
    messagingSenderId: "781240351972",
    appId: "1:781240351972:web:acf144920664fb013f00f1",
    measurementId: "${config.measurementId}"
};


let Firebase ;
if(firebase.apps.length === 0){
    Firebase = firebase.initializeApp(firebaseConfig);
     
        
      }



export default Firebase;
