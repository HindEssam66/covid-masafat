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
        //read all data from database using firebase user array
      let userresponse=  ["username","email","long","latitude","alert"] //From firebase
        setState({
            ...state,
            loaded:true,
            data:userresponse
   
           });
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