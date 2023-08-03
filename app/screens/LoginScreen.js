import {View, Text, StyleSheet, KeyboardAvoidingView,Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SnackBar from 'react-native-snackbar'
// custom import
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {validateInput} from '../utils/validators';
import ErrorText from '../components/ErrorText';
import { LOGIN_URL } from '../constants/api';
// --------------------------------------

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);


useEffect(()=>{
    setError(false)
},[phoneNumber,password])


  function handleSignIn() {
    Keyboard.dismiss()
    const isPhoneNumberValid = validateInput(
      
      phoneNumber,
      setError,
    );
    const isPasswordValid = validateInput(password, setError);
    if (isPhoneNumberValid && isPasswordValid){
        const formData=new FormData()
        formData.append("mobile",phoneNumber)
        formData.append("password",password)
const loginUser=async()=>{
    try{
        const result = await axios({
             url:LOGIN_URL,
             method:"post",
             data:formData,
             headers:{
                 Accept:"application/json",
                 "content-type":"multipart/form-data"
             }
         })
         SnackBar.show({
            text:result.data.msg,
            duration:SnackBar.LENGTH_SHORT
         })
        if (result.data.sts === "00"){
            return false
        }
     }catch(error){
         console.log(error.message)
         SnackBar.show({
            text:error.message,
            duration:SnackBar.LENGTH_SHORT
         })
     }

}

       loginUser()
    }
return loginUser
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={-100} style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.agbm}>ABGM</Text>
          </Text>
          <Text style={styles.descText}>Project Management System</Text>
        </View>
<View style={{gap:15}}>
        <CustomTextInput
          iconStart="phone"
          keyboardType="numeric"
          onChangeText={value => setPhoneNumber(value)}
          placeholder="Enter Your Mobile Number"
          value={phoneNumber}
        />
        {error && <ErrorText>Phone Number field required</ErrorText>}
        <CustomTextInput
          iconEnd="eye"
          iconStart="lock"
          onChangeText={value => setPassword(value)}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          placeholder="Enter Your Password"
          secureTextEntry={secureTextEntry}
          value={password}
        />
        {error && <ErrorText>Password field required</ErrorText>}
        </View>

        <View  style={{width: '100%', marginTop: '5%'}}>
          <CustomButton onPress={handleSignIn} title="Sign In" />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05324D',
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  agbm: {
    color: '#6090AF',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },
  welcomeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
  },
  descText: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  textContainer: {
    marginTop: "-10%",
    marginBottom: '15%',
  },
});
