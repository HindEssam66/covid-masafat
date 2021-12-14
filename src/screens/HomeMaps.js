import React, { Component } from "react";
import { View, I18nManager, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location"
import Utils from "../utils/Utils";
import Firebase from "../../firebase";


const dimensions = Dimensions.get("window");
I18nManager.allowRTL(false);
export default function HomeMaps({ route }) {

 
    const distance_url=""
    const [lat, setLat] = React.useState(31.96315);
    const [lgtd, setLong] = React.useState(35.930359);
    const mapref = React.useRef(null);
    const longDelta = 0.0421;
    const latDelta = 0.0922
    const [location, setLocation] = React.useState(null);

  /* React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            //let location = await Location.getCurrentPositionAsync({});
            let location=await _getLocationAsync();
            setLong(location.coords.longitude);
            setLat(location.coords.latitude)
            setLocation(location);
        

        })();
    }, []);/*


    /* if(props!=undefined){
        userlocation=JSON.stringify(props);
         setRegion({
           
             longitude:userlocation.longitude,
             latitude:userlocation.latitude
         })
 } */


 React.useEffect(() => {
    (async () => {
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLong(location.coords.longitude);
        setLat(location.coords.latitude)
        setLocation(location);

    })();
}, []);



    const updateUserLocation  = (longitude,latitude,userid) =>{
            const data = {
                longitude,
                latitude,
              // userid:Firebase.auth().currentUser.uid
               userid
            }
            Firebase.firestore().collection("locations").add(data);


    }

   

   

    Firebase.firestore().collection("locations").onSnapshot((snapshot) => {
        console.log(snapshot.docs[0].data());
        const data = snapshot.docs[0].data();
       

      });

    const region = {
        latitude: lat,
        longitude: lgtd,
        longitudeDelta: longDelta,
        latitudeDelta: latDelta,
        //username: uname,

    }


    
   const _getLocationAsync = async () => {

    await Location.startLocationUpdatesAsync("background-location-task", {
      enableHighAccuracy: true,

      distanceInterval: 1,
      timeInterval: 50
    });
    const myLocation = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 50
      },
      newLocation => {
        let { coords } = newLocation;
        console.log("Testing ....",coords)
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
      },
      error => console.log(error)
    );
    console.log("lilyan",myLocation);
    return myLocation;


  };
  fetchDistanceBetweenPoints = (user1lat, user1long, user2lat, user2long) => {
    var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+user1lat+','+user1long+'&destinations='+user2lat+'%2C'+user2long+'&key=' + "YOUR_GOOGLE_DIRECTIONS_API_KEY";
    fetch(urlToFetchDistance)
            .then(res => {
    return res.json()
  })
  .then(res => {
            var distanceString = res.rows[0].elements[0].distance.text;
            if(distanceString<=2){
                Alert("Distance is too short. Social Distancing is recommended");
                //update locations table using firebase and set alert to any message
            }
            //update firebase with another message alert
  })
  .catch(error => {
            console.log("Problem occurred",error);
  });

}

 

    return (
        <MapView
            style={styles.map}
            region={region}
            ref={mapref}
            provider={PROVIDER_GOOGLE}
            onMapReady={() => {
                mapref.current.animateToRegion(region);
                updateUserLocation(region.longitude, region.latitude,Firebase.auth().currentUser.uid);
            }}
            onRegionChangeComplete={(new_region) => {
                updateUserLocation( new_region.longitude, new_region.latitude,Firebase.auth().currentUser.uid);
            }}

            initialCamera={{
                zoom: 10000,
                center: region,
                pitch: 90,
                altitude: 20,
                heading: 10

            }}

        >

            <Marker coordinate={{
                latitude: region.latitude,
                longitude: region.longitude
            }} description={
                route.params.loggedInUser
            } draggable={true} />
        </MapView>
    );


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        ...StyleSheet.absoluteFillObject
    }
});