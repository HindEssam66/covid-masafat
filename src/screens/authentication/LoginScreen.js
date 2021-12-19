import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Alert, ActivityIndicator, ToastAndroid, Platform, TextInput, SafeAreaView, StatusBar, Image } from "react-native";
import React from "react";
import Firebase from '../../../firebase';
import styles from "../../../styles";

const dimensions = Dimensions.get("screen");
export default function LoginScreen({ navigation }) {
    const [state, setState] = React.useState({
        email: "",
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




    const signIn = () => {
        try {
            Firebase
                .auth()
                .signInWithEmailAndPassword(state.email, state.password).then((response) => {
                    console.log("Login  response", response.user.role) 
                    if (response.user.role === 1) {
                        navigation.navigate("AdminPage", {
                            useremail: state.email
                        });
                    }
                    navigation.navigate("Home", {
                        useremail: state.email
                    });

                }).catch((err) => {

                    Platform.OS == "android" ? ToastAndroid.showWithGravity("User with the password doesn't exist", ToastAndroid.LONG, ToastAndroid.TOP) :
                        Alert.alert("User with the password doesn't exists");
                    state.isformcomplete = false;
                    setState(state);
                })
        } catch (err) {
            Platform.OS == "android" ? ToastAndroid.showWithGravity("User with the password doesn't exist", ToastAndroid.LONG, ToastAndroid.TOP) :
                Alert.alert("User with the password doesn't exists");
            state.isformcomplete = false;
            setState(state);
        }
    }

    return (

        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" backgroundColor={'#172774'} />
            <View style={styles.container}>
                <View style={styles.boxheader}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/logo.png')}
                    />
                </View>

                <View style={styles.loginbox}>
                    <Text style={styles.tile}>Login Please Here</Text>

                    <View style={styles.button}>
                        <TextInput placeholder="Enter your email" onChange={value => {
                            setState({
                                ...state,
                                email: value.nativeEvent.text.toString()
                            })
                        }} keyboardType="default" value={state.email} />
                    </View>

                    <View style={styles.button}>
                        <TextInput placeholder="Enter your Password"
                            onChange={value => {
                                setState({
                                    ...state,
                                    password: value.nativeEvent.text.toString()
                                })
                            }} value={state.password} secureTextEntry={true} />
                    </View>

                    {state.isformcomplete ? <ActivityIndicator size="large" color="#0000ff" /> :
                        <TouchableOpacity
                            style={[styles.login, { backgroundColor: '#F66095' }]}
                            onPress={() => {
                                if (state.email.length > 0 && state.password.length > 0) {
                                    setState({
                                        ...state,
                                        isformcomplete: true
                                    });

                                    //signIn(state.username,state.password);
                                    signIn();
                                }
                                else {
                                    Alert.alert("Invalid or Empty email or password")
                                }

                            }} >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold"
                            }}>Login</Text>
                        </TouchableOpacity>
                    }
                    <View style={{
                        alignItems: "center"
                    }}>
                        <Text style={{ textAlign: 'left', color: '#fff', marginLeft: 10 }}>You don't have an account?
                            <Text style={{ color: 'red' }} onPress={() => navigation.navigate("Register")}> Create an account here</Text></Text>
                    </View>


                </View>

            </View>


        </SafeAreaView>
    );
}