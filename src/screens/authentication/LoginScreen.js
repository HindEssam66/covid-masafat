import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Alert, ActivityIndicator, ToastAndroid, Platform } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import Utils from "../../utils/Utils";


const dimensions = Dimensions.get("screen");
export default function LoginScreen({ navigation }) {
    const [state, setState] = React.useState({
        username: "",
        password: "",
        loggedIn: false,
        message: "",
        isformcomplete: false,
        toastvisible: false
    });
    // React.useEffect(() => {
    //     if (state.isloggedIn == true) {
    //         navigation.navigate("Home", {
    //             user: state.username
    //         });
    //     }
    // }, [state.isloggedIn])


    function login(user, pass) {
        const data = {
            username: user,
            password: pass
        }
        fetch(Utils.baseurl + "/api/users/login", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then((response) => response.json())
            .then((data) => {
                let response = JSON.parse(JSON.stringify(data));
                if (response.User != null) {
                    setState({
                        ...state,
                        message: response.message,
                        loggedIn: true,
                        isformcomplete: false,
                        toastvisible: true
                    });
                    Platform.OS === "android" ? ToastAndroid.showWithGravity(
                        response.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    ) : Alert(
                        response.message
                    );
                    navigation.navigate("Home", {
                        loggedInUser: response.User.username
                    });
                }
                else {
                    setState({
                        ...state,
                        message: response.message,
                        isformcomplete: false
                    });
                    Platform.OS === "android" ? ToastAndroid.showWithGravity(
                        response.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    ) : Alert(
                        response.message
                    );
                }
            }).catch(function (err) {
                console.log(err);
                setState({
                    ...state,
                    isformcomplete: false
                });
                Platform.OS === "android" ? ToastAndroid.showWithGravity(
                    err.toString(),
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                ) : Alert(
                    err.toString()
                );
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
            }} value={state.password} secureTextEntry={true} />
            {state.isformcomplete ? <ActivityIndicator size="large" color="#0000ff" /> :
                <TouchableOpacity onPress={() => {
                    if (state.username.length > 0 && state.password.length > 0) {
                        setState({
                            ...state,
                            isformcomplete: true
                        });
                        login(state.username, state.password);
                    }
                    else {
                        Alert.alert("Invalid or Empty username or password")
                    }

                }} style={styles.loginbutton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            }
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