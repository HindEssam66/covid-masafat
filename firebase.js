import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyChh0vLQewi4WrtZIuOQEJuHsoaCQ-bcVk",
  authDomain: "clever-acolyte-332717.firebaseapp.com",
  projectId: "clever-acolyte-332717",
  storageBucket: "clever-acolyte-332717.appspot.com",
  messagingSenderId: "367964093415",
  appId: "1:367964093415:web:0093b532ed4a6d66721b42",
  measurementId: "G-BSFVMK383E"
};




let Firebase ;
if(firebase.apps.length === 0){
    Firebase = firebase.initializeApp(firebaseConfig);
     
        
      }



export default Firebase;
