
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";


const LoginStack = createStackNavigator();
export default function App() {


    return (
        <NavigationContainer>
            <AuthenticationNavigation />
        </NavigationContainer>
    );
}