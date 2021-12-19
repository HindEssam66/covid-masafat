
import React, { useCallback, useState } from 'react';
import { View, I18nManager, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location"
import Utils from "../utils/Utils";
import Firebase from "../../firebase";



const dimensions = Dimensions.get("window");
I18nManager.allowRTL(false);
export default function HomeMaps({ route }) {


    const distance_url = ""
    const [region, setRegion] = React.useState({});
    const mapref = React.useRef(null);
    let { width, height } = Dimensions.get('window');
    const aspect_ratio = width / height;
    const latDelta = 0
    const longDelta = latDelta * aspect_ratio;
   // const [location, setLocation] = React.useState(null);
   
   const [location, setLocation] = React.useState({ lgtd: "", lat: "" })
   const callback = useCallback((location) => {
       // this is the location what you need ;

   }, []);

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

const[timer,setTimer]=useState(0);
    React.useEffect(() => {

        let currentInterval= setInterval(() => {
                getMyLocation().then((myRegion) => {
                    const myLocalLocation = location;
                    setLocation(myRegion);
                    console.log( "My Region: ", myRegion);
                    if (myLocalLocation.lgtd !== myRegion.longitude || myLocalLocation.lat !== myRegion.latitude) {
                        updateUserLocation(myRegion);
                        console.log( "My Region: ", myRegion);
                    }
        setTimer(timer+1)
                }).catch((err) => {
                    console.log("Error : ", err);
                })
            }, 2000);
            return () => clearInterval(currentInterval);
  

         },[timer] );
    


    async function getMyLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({/*LocationAccuracy : Accuracy.BestForNavigation*/}
            );
        const myRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            longitudeDelta: longDelta,
            latitudeDelta: latDelta,
        };
        setRegion(myRegion);

       return(myRegion)


    }



 
    const updateUserLocation = (longitude, latitude, userid) => {
try {
    const data = {
        longitude,
        latitude,
        userid
    }
    console.log(data);
    Firebase.firestore().collection("locations").add(data);
} catch (error) {
    console.log(error.stack);
    
}

        

    }





    Firebase.firestore().collection("locations").onSnapshot((snapshot) => {
        // console.log(snapshot.docs[0].data());
        const data = snapshot.docs[0].data();


    });





    /* const _getLocationAsync = async () => {
 
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
                 console.log("Testing ....", coords)
                 let region = {
                     latitude: coords.latitude,
                     longitude: coords.longitude,
 
                 };
             },
             error => console.log(error)
         );
         return myLocation;
     };
     */

    /*fetchDistanceBetweenPoints = (user1lat, user1long, user2lat, user2long) => {
        var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + user1lat + ',' + user1long + '&destinations=' + user2lat + '%2C' + user2long + '&key=' + "AIzaSyAW36-XJlxgmfTpeCo4sYYln2Ub09x1mbg";
        fetch(urlToFetchDistance)
            .then(res => {
                return res.json()
            })
            .then(res => {
                var distanceString = res.rows[0].elements[0].distance.text;
                if (distanceString <= 2) {
                    Alert("Distance is too short. Social Distancing is recommended");
                    //update locations table using firebase and set alert to any message
                }
                //update firebase with another message alert
            })
            .catch(error => {
                console.log("Problem occurred", error);
            });

    }*/



    return region.latitude && region.longitude ?(
        <MapView
            style={styles.map}
            region={region}
            ref={mapref}
            provider={PROVIDER_GOOGLE}
            onMapReady={() => {
                mapref.current.animateToRegion(region);
               //r updateUserLocation(region.longitude, region.latitude, Firebase.auth().currentUser.uid);
            }}
            onRegionChangeComplete={(new_region) => {
                updateUserLocation(new_region.longitude, new_region.latitude, Firebase.auth().currentUser.uid);
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
    ): null;


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