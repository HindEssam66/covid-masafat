import React from 'react';
import { View, Text ,SafeAreaView,StatusBar,Image} from 'react-native'
import styles from './styles';

export default function LoginScreen() {
    return (
        <SafeAreaView style={styles.safeContainer}>
         <StatusBar barStyle="light-content" backgroundColor={'#172774'}/>
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
        <Text style={{textAlign:'center',marginTop:15}}>Enter Your Email</Text>

        </View>
        <View style={styles.button}>
        <Text style={{textAlign:'center',marginTop:15}}>Enter Your Password</Text>

        </View>
        {/* {[styles.greenUnderline, styles.red]}> */}
        <View  style={[styles.button, {backgroundColor:'#F66095'}]}>
        <Text style={{textAlign:'center',marginTop:15, fontSize:'20'}}>Login</Text>

        </View>
        <Text style={{textAlign:'center',margin:20, color:'#fff'}}>Sreeraj</Text>
        </View>
        </View>
        </SafeAreaView>
    )
}
