
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
export default function App() {
    return (
        <NavigationContainer>
            <AuthenticationNavigation />
        </NavigationContainer>
    );
}