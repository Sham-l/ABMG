import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, { useEffect,useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
// custom import
import Screen from '../components/Screen';
import { UserContext } from '../utils/userDataContext';



export default function SplashScreen() {

const {setIsLoading,tempUserId,setTempUserId,userId,setIsLoggedIn}=useContext(UserContext)


useEffect(()=>{
  async function getUserData(){
    try{
     const data = await AsyncStorage.getItem("userId")
     if (data !== null){
      setTempUserId(data)
      setIsLoggedIn(true)
     }else{
      setIsLoggedIn(false)
     }
    
    }catch(error){
      Snackbar.show({
        text:"Failed get UserData"
      })
    }
  }
  getUserData()
},[userId])

useEffect(()=>{

  setTimeout(()=>{
    setIsLoading(false)
  },2000)
},[])
console.log(tempUserId,": from splash screen")
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
