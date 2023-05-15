import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
export default function First({navigation}) {

  return (
    <ImageBackground  source={require('./image1.png')} style={styles.background}>
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('About')} style={styles.button}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop:200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color:"black",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin:20,
    backgroundColor: "#63666A", 
    color: "black"
    
  },
  buttonText: {
    color:"white",
    fontSize: 18,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});