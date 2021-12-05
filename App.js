
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import RegisterScreen from "./src/screens/authentication/RegisterScreen";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import Dashboard from "./src/screens/database/Dashboard";

const Stack = createStackNavigator();
const LoginStack=createStackNavigator();

export default function App() {
 /* if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
*/
  return (
      
    <NavigationContainer>
       <AuthenticationNavigation/>
    </NavigationContainer>
  );
}

