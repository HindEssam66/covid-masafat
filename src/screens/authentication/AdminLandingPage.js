import React from "react";
import { ScrollView,StyleSheet,ActivityIndicator} from "react-native";

export default function AdminLandingPage(){
    const [state,setState]=React.useState({
        data:[],
        loaded:false
    });
    React.useEffect(()=>{
  readReadAllDataFromDatabase();
    },[])

    const readReadAllDataFromDatabase=()=>{
        

            const UsersSnapshots =  firebase.firestore().collection('users').get()
            const users = UsersSnapshots.docs.map(doc => doc.data());
    
            const LocationsSnapshots =  firebase.firestore().collection('locations').get()
            const locations = LocationsSnapshots.docs.map(doc => doc.data());
            console.log(UsersSnapshots.docs[0].data());
            UsersSnapshots.docs.forEach((doc) =>{
                const userId = doc.id;
                const userData = doc.data();
                const myLocations = locations.filter((ele) => ele.userId === userId);
                
                userData['locations'] = myLocations ; 
                let userresponse= myLocations;
                setState({
                    ...state,
                    loaded:true,
                    data:userresponse
           
                   });
                });
                
        //read all data from database using firebase user array
        //fecth locations from the firebase
        //Get the data and an array
        //userArray (email,username,long,lat,message)
    }
    return (
        <ScrollView>
            <View style={styles.constainer}>
               {state.loaded?
               (<View style={styles.loadedusers}>
                   {state.data.map((index,value)=><View key={index}>
                       <Text>{value.username}</Text>
                       <Text>{value.email}</Text>
                       <Text>{value.latitude}</Text>
                       <Text>{value.longtude}</Text>
                       <Text>{value.alertmessage}</Text>
                   </View>)}
               </View>):
               <View style={styles.unloadedUsers}>
                  < ActivityIndicator/>
                </View>}

            </View>
        </ScrollView>
    );
}
const styles=StyleSheet.create({
    constainer:{
        flex:1,
        justifyContent:"center"
    },
    unloadedUsers:{
        justifyContent:"center",
        alignItems:"center"

    },
    loadedusers:{
        justifyContent:"space-evenly",
        flexDirection:"row"
    }
})