import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

// custom import
import Screen from '../components/Screen';
export default function SplashScreen() {
  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../assets/abmg.png')}
      />
      <ImageBackground style={styles.logo} source={require("../assets/ereLogo.png")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0F2A3A',
    justifyContent: 'center',
    alignItems: 'center',
    position:"relative",
    flex:1
  },
  imageBackground: {
    height: 87,
    width: 102,
    resizeMode: 'cover',
  },
  logo:{
    height:24,
    width:111,
    position:"absolute",
    bottom:"5%"
  }

});
