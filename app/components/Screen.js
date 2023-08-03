import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function Screen({ children,style}) {
  return (
    <SafeAreaView style={[styles.container,style]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
