import React, { Component } from "react";
import { View, I18nManager, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location"
import Utils from "../utils/Utils";


const dimensions = Dimensions.get("window");
I18nManager.allowRTL(false);
export default function HomeMaps({ route }) {
    const [lat, setLat] = React.useState(24.774265);
    const [lgtd, setLong] = React.useState(46.738586);
    const mapref = React.useRef(null);
    const longDelta = 0.0421;
    const latDelta = 0.0922
    const [location, setLocation] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
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


    /* if(props!=undefined){
        userlocation=JSON.stringify(props);
         setRegion({
           
             longitude:userlocation.longitude,
             latitude:userlocation.latitude
         })
 } */

    function updateUserLocation(username, lng, lat) {
        fetch(Utils.baseurl + "api/users/location", {
            body: JSON.stringify({
                "username": username,
                "longitude": lng,
                "latitude": lat
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "post"
        })
            .then(resp => resp.json())
            .then(data => {
                let response = JSON.parse(JSON.stringify(data));
                console.log(response)
            }).catch((erro) => {
                console.log(erro)
            })

    }

    const region = {
        latitude: lat,
        longitude: lgtd,
        longitudeDelta: longDelta,
        latitudeDelta: latDelta

    }

    //default state

    return (

        <MapView
            style={styles.map}
            region={region}
            ref={mapref}
            provider={PROVIDER_GOOGLE}
            onMapReady={() => {
                mapref.current.animateToRegion(region);
                updateUserLocation(route.params.loggedInUser, region.longitude, region.latitude)

            }}
            onRegionChangeComplete={(new_region) => {
                updateUserLocation(route.params.loggedInUser, new_region.longitude, new_region.latitude)
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