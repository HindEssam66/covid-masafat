import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function LoginScreen({navigation}){
    return(<View style={{
        flex:1
    }}>
        <Text>
        Login screens</Text>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Home",{
                user:"Hind"
            });
        }}>
            <Text>Login</Text>
        </TouchableOpacity>
        </View>);

}