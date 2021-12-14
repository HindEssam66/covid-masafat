
    
    /*
    await Firebase.auth().createUserWithEmailAndPassword(email, password);
    const response=await firebase.auth().createUserWithEmailAndPassword(email,username,password);
      if(response){
        console.log(response);
      } 
  
      const currentUser =auth().currentUser;
      create a collection ( a.k.a. tables or models) called “users”
      firestore.collection("users")
        // .doc for create a document (id)
        .doc(currentUser.uid)
        //.set for represents the customized field (data)
        .set({
          email: currentUser.email,
          username: username,
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
  
  export async function getCurrentUser() {
    try {
      let currentUserUID = firebase.auth().currentUser.uid;
      let doc = await firebase
        .firestore()
        .collection('users')
        .doc(currentUserUID)
        .get();
  
      return doc.exists ? doc.data() : null;
    }
    catch (err) {
      Alert.alert("There is something wrong!", err.message);
      return null;
    }
  
  } */