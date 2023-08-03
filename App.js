import { View, Text } from 'react-native'
import React from 'react'

// custom import
import SplashScreen from './app/screens/SplashScreen'
import LoginScreen from './app/screens/LoginScreen'
import CustomTextInput from './app/components/CustomTextInput'
import HomeScreen from './app/screens/HomeScreen'
export default function App() {
  return (
    <View style={{flex:1}}>
      <LoginScreen/>
{/* <HomeScreen/> */}
    </View>
  )
}