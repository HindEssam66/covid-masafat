//“Dashboard” screen to view their profile information and sign-out

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {loggingOut,getCurrentUser} from '../API/firebaseMethods';

export default function Dashboard({ navigation }) {
  const [username, setusername] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      const userData = await getCurrentUser()
      if (!userData){
        Alert.alert('No user data found!')
      } else {
        setusername(userData.username)
      }
    }
    getUserInfo();
  })

  const handlePress = () => {
    loggingOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dashboard</Text>
      <Text style={styles.text}>Hi {username}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}