import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Alert, ActivityIndicator, ToastAndroid, Platform ,TextInput} from "react-native";
import React from "react";
import Firebase from '../../../firebase';


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
            .signInWithEmailAndPassword(state.email,state.password).then((response)=>{
                console.log("Login  response",response.user.email)
                if(response.user.email==="masafat"){
                    navigation.navigate("AdminPage", {
                        useremail: state.email
                    });
                }
                navigation.navigate("Home", {
                useremail: state.email
            });
            }).catch((err)=>{
                
                Platform.OS=="android"? ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.TOP):
                Alert.alert(err.message);
                state.isformcomplete= false; 
                setState(state);
            })
        } catch (err) {
          
          Platform.OS=="android"? ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.TOP):
          Alert.alert(err.message);
          state.isformcomplete= false; 
          setState(state);
        }
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
            <TextInput placeholder="Enter your email" style={styles.inputSize} onChange={value => {
                setState({
                    ...state,
                    email: value.nativeEvent.text.toString()
                })
            }} keyboardType="default" value={state.email} />
            <TextInput placeholder="Enter your Password" style={styles.inputSize} onChange={value => {
                setState({
                    ...state,
                    password: value.nativeEvent.text.toString()
                })
            }} value={state.password} secureTextEntry={true} />
            {state.isformcomplete ? <ActivityIndicator size="large" color="#0000ff" /> :
                <TouchableOpacity onPress={() => {
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