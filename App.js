
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import RegisterScreen from "./src/screens/authentication/RegisterScreen";
import HomeMaps from "./src/screens/HomeMaps";

const LoginStack=createNativeStackNavigator();
export default function App() {
    return (
    <NavigationContainer>
        <LoginStack.Navigator initalRouteName="Login">
            <LoginStack.Screen name="Login" component={LoginScreen}/>
            <LoginStack.Screen name="Register" component={RegisterScreen}/>
            <LoginStack.Screen name="Home" component={HomeMaps}/>
        </LoginStack.Navigator>
       
    </NavigationContainer>);
}