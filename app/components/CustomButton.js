import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({style,title,onPress}) {
  return (
    <TouchableOpacity activeOpacity={.7} style={[styles.button,style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    button:{
        backgroundColor:"#7091A4",
        borderRadius:10,
        width:"100%",
        height:45,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:13,
        fontWeight:"500",
        color:"#FFFFFF"
    }
})

