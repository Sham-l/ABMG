import {  View,Text,StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorText({children}) {
    return (
            <Text style={styles.text}>{children}</Text>
            
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        alignSelf: "flex-start",
        color:"#B31312"
    }
})