import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View, Text, StatusBar } from "react-native";
import Firebase from "../../../firebase";

export default function AdminLandingPage() {
    const [state, setState] = React.useState({
        data: [],
        loaded: false
    });
    React.useEffect(() => {
        readReadAllDataFromDatabase();
    }, [])

    const readReadAllDataFromDatabase = () => {
        const usersdata = Firebase.firestore().collection('users').get()
        console.log("usersSnapshots ", usersdata
        );
        const users = usersdata.map(doc => doc.data());
       
        const LocationsSnapshots = Firebase.firestore().collection('locations').get()
        const locations = LocationsSnapshots.docs.map(doc => doc.data());
      
        usersdata.docs.forEach((doc) => {
            const userId = doc.id;
            const userData = doc.data();
            const myLocations = locations.filter((ele) => ele.userId === userId);
            console.log('locations %d', locations);
            userData['locations'] = myLocations;
            let userresponse = myLocations;
            setState({
                ...state,
                loaded: true,
                data: userresponse

            });
        });

        //read all data from database using firebase user array
        //fecth locations from the firebase
        //Get the data and an array
        //userArray (email,username,long,lat,message)
    }
    return (
        <ScrollView style={{
            ...styles.container
        }}>
            <View >
                {state.loaded ?
                    (<View style={styles.loadedusers}>
                        {state.data.map((index, value) => <View key={index}>
                            <Text>{value.username}</Text>
                            <Text>{value.email}</Text>
                            <Text>{value.latitude}</Text>
                            <Text>{value.longtude}</Text>
                            <Text>{value.alertmessage}</Text>
                        </View>)}
                    </View>) :
                    <View style={styles.unloadedUsers}>
                        < ActivityIndicator />
                    </View>}

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight

    },
    unloadedUsers: {
        justifyContent: "center",
        alignItems: "center"

    },
    loadedusers: {
        justifyContent: "space-evenly",
        flexDirection: "row"
    }
})