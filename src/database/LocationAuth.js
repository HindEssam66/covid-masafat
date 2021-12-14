
import { Alert } from "react-native";
import Firebase from "../../firebase";



export async function LocationAuth(username,longitude, latitude) 

{
    const data = { "username": "masafat" , "longitude": "35.930359", "latitude": "31.963158" };


    Firebase.auth().CreateUserWithLongitudeAndLatitude(data.username, data.longitude, data.latitude)
    .then((userCredential) => {
      console.log("My Cred. :", userCredential);
      Firebase.firestore().collection("users").add(data).then((response) => {
        Firebase.firestore().collection("users").onSnapshot((snapshot) => {
          const arr = snapshot.docs.map(doc => doc.data()) || [];
          console.log(arr);
        });
      }).catch((err) => {
        console.log("Error : ", err);
      })
    })
    .catch((error) => {
    console.log("EEE : ",error);
      // ..
    }); 
}