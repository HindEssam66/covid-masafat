// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAnalytics } from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0_ZAO3wgRlLdvymaJIyKLEgqfqNtUdvY",
  authDomain: "masafat-332616.firebaseapp.com",
  projectId: "masafat-332616",
  storageBucket: "masafat-332616.appspot.com",
  messagingSenderId: "781240351972",
  appId: "1:781240351972:web:acf144920664fb013f00f1",
  measurementId: "G-4CY2SZEG1Y"
};

// Initialize Firebase
let app;
if(firebase.app.length===0) {
app = firebase.initializeapp( firebaseConfig);

} else {
app= firebase.app()
}
const  auth  = firebase.auth()
export { auth};
// firebase must be '8.2.3'