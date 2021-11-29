import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Alert } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";


const dimensions = Dimensions.get("screen");
export default function LoginScreen({ navigation }) {

    const [state, setState] = React.useState({
        username: "",
        password: ""
    })
    function login(user, pass) {
        console.log(user, pass)
        //add database user login check here
        navigation.navigate("Home", {
            user: user
        });
    }
    return (<View style={
        styles.container
    }>

        <View style={{
            ...styles.loginView
        }}>
            <Text style={{
                ...styles.heading, 
                marginBottom: 10
            }}>Please Log In</Text>
            <TextInput placeholder="Enter your username" style={styles.inputSize} onChange={value => {
                setState({
                    ...state,
                    username: value.nativeEvent.text.toString()
                })
            }} keyboardType="default" value={state.username} />
            <TextInput placeholder="Enter your Password" style={styles.inputSize} onChange={value => {
                setState({
                    ...state,
                    password: value.nativeEvent.text.toString()
                })
            }} value={state.password} />

            <TouchableOpacity onPress={() => {
                if (state.username.length > 0 && state.password.length > 0) {
                    login(state.username, state.password);
                }
                else {
                    Alert.alert("Invalid or Empty username or password")
                }

            }} style={styles.loginbutton}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.rowtexts}>
                <Text style={{
                    ...styles.heading, fontWeight: "normal", fontSize: 16
                }}>Don't Have an account? </Text>
                <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>Create Account Here</Text>
            </View>

        </View>


    </View>);

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold"
    },
    loginContainer: {
        margin: 20,

        justifyContent: "center",
        alignItems: "center"
    },
    loginView: {
        marginTop: dimensions.height * .2,
        padding: 10,
        // backgroundColor: "#D6CBC9",
        margin: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    inputSize: {
        height: 50,
        margin: 10,
        width: dimensions.width * .8,
        backgroundColor: "#E5E8E8",
        borderRadius: 5
    },
    loginbutton: {
        padding: 15,
        margin: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3DA4EC",
        width: dimensions.width * .8,
    },
    loginText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    rowtexts: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    registerText: {
        fontSize: 17,
        color: "#3DA4EC",
        fontWeight: "700"
    }
})