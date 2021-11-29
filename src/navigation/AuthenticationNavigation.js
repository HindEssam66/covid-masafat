
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import HomeMaps from "../screens/HomeMaps";
import { createStackNavigator } from "@react-navigation/stack";


const LoginStack = createStackNavigator();

export default function AuthenticationNavigation() {
    return (
        <LoginStack.Navigator initalRouteName="Login" screenOptions={{
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontSize: 20,
            },

        }}>
            <LoginStack.Screen name="Login" component={LoginScreen}
                options={{
                    headerTitle: " Welcome to Covid 19 Masafat",
                }} />
            <LoginStack.Screen name="Register" component={RegisterScreen} options={{
                headerTitle: "Create an account with us"
            }} />
            <LoginStack.Screen name="Home" component={HomeMaps} options={{
                headerTitle: "Home Page"
            }} />
        </LoginStack.Navigator>
    );
}
