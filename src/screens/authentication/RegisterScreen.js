import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert } from "react-native";
import React from "react";

const dimensions = Dimensions.get("screen");
export default function RegisterScreen({ navigation }) {
    const [state, setState] = React.useState({
        username: "",
        password: "",
        email: ""
    })
    function register(mail, uname, pass) {
        console.log(mail, uname, pass)
    }
    return (
        <View style={styles.container}>
            <View style={{ ...styles.registerView }}>
                <Text style={{
                    ...styles.heading,
                    marginBottom: 10
                }}>Create Account</Text>
                <TextInput placeholder="Email Address" style={styles.inputSize} onChange={value => {
                    setState({
                        ...state,
                        email: value.nativeEvent.text.toString()
                    });
                }} keyboardType="email-address" value={state.email} />
                <TextInput placeholder="Username" style={styles.inputSize} onChange={value => {
                    setState({
                        ...state,
                        username: value.nativeEvent.text.toString()
                    });
                }} keyboardType="default" value={state.username} />
                <TextInput placeholder="Password" style={styles.inputSize} onChange={value => {
                    setState({
                        ...state,
                        password: value.nativeEvent.text.toString()
                    });
                }} keyboardType="default" value={state.password} />
                <TouchableOpacity onPress={() => {
                    if (state.username.length > 0 && state.password.length > 0 && state.email > 0) {
                        register(state.email, state.username, state.password);
                        navigation.navigate("Login");
                    }
                    else {
                        Alert.alert("Please fill all details.All columns are mandatory")
                    }

                }} style={styles.registerbutton}>
                    <Text style={styles.registerText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.rowtexts}>
                    <Text style={{
                        ...styles.heading, fontWeight: "normal", fontSize: 16
                    }}>Already Have an Account? </Text>
                    <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}>Log in Here</Text>
                </View>
            </View>
        </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    registerView: {
        marginTop: dimensions.height * .2,
        padding: 10,
        // backgroundColor: "#D6CBC9",
        margin: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 27,
        fontWeight: "bold"
    },
    inputSize: {
        height: 50,
        margin: 10,
        width: dimensions.width * .8,
        backgroundColor: "#E5E8E8",
        borderRadius: 5
    },
    registerbutton: {
        padding: 15,
        margin: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3DA4EC",
        width: dimensions.width * .8,
    },
    registerText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    rowtexts: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    loginText: {
        fontSize: 17,
        color: "#3DA4EC",
        fontWeight: "700"
    }
})