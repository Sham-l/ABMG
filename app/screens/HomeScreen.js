import { View, Text } from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
// custom import 
import Screen from '../components/Screen'

// -----------------------------


export default function HomeScreen() {
  return (
    <Screen>
      <WebView source={{uri:"https://bms.abglobalmining.co.za/app/2"}}/>
    </Screen>
  )
}