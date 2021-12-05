import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(email, username,password ) {
  try {
      /*requires two arguments, email, and password, to create an account for the user on the “Authentication” of your Firebase Console.
       It automatically assigns a unique UID to identify each user.*/  

    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
/*create a collection ( a.k.a. tables or models) called “users”*/
    const db = firebase.firestore();
    db.collection("users")
    // .doc for create a document (id)
      .doc(currentUser.uid)
      //.set for represents the customized field (data)
      .set({
        email: currentUser.email,
        username:  uname,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      //method validate a user through Firebase Authentication
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try { 
      //is invoked when the user pressed the “Sign Out”
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}