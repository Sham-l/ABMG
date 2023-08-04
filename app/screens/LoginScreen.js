import {View, Text, StyleSheet, KeyboardAvoidingView,Keyboard,ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import SnackBar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
// custom import
import Screen from '../components/Screen';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {validateInput} from '../utils/validators';
import ErrorText from '../components/ErrorText';
import { LOGIN_URL } from '../constants/api';
import { UserContext } from '../utils/userDataContext';
// --------------------------------------

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dataStored,setDataStored]=useState(false)
  const [isIndicator,setIsIndicator]=useState(false)
const {isLoggedIn,setIsLoggedIn,setUserId,userId}=useContext(UserContext)


useEffect(()=>{
  if (passwordError || phoneError){
    setPhoneError(false)
    setPasswordError(false)
    
  }
    
},[phoneNumber,password])

useEffect(()=>{

})

useEffect(()=>{
  if(dataStored){
    setIsLoggedIn(true)
    setIsIndicator(false)
  }
},[dataStored])

async function handleSignIn() {
  setIsIndicator(true)
  Keyboard.dismiss();
  const isPhoneNumberValid = validateInput(phoneNumber, setPhoneError);
  const isPasswordValid = validateInput(password, setPasswordError);
  if (isPhoneNumberValid && isPasswordValid){
      const formData = new FormData();
      formData.append("mobile", phoneNumber);
      formData.append("password", password);

      const loginUser = async () => {
          try {
              const result = await axios({
                  url: LOGIN_URL,
                  method: "post",
                  data: formData,
                  headers: {
                      Accept: "application/json",
                      "content-type": "multipart/form-data"
                  }
              });

              SnackBar.show({
                  text: result.data.msg,
                  duration: SnackBar.LENGTH_SHORT
              });

              if (result.data?.sts === "01") {
                console.log(result.data)
                  setUserId(result.data?.user?.id.toString());

                  async function storeData() {
                      try {
                          await AsyncStorage.setItem("userId", result.data?.user?.id.toString()); // Use `result.data?.user?.id` here to ensure the right data is stored
                          console.log(userId, "login screen");
                          setDataStored(true)
                          return true;
                      } catch (error) {
                          setIsLoggedIn(false);
                          return false;
                      }
                  }

                  const isStored = await storeData(); // Wait for storeData to complete
                  return isStored; // Return true if storing data succeeded, false otherwise
              } else {
                  SnackBar.show({
                      text: result.data.msg,
                      duration: SnackBar.LENGTH_SHORT
                  });
                  return false;
              }
          } catch (error) {
              console.log("login screen", error.message);
              SnackBar.show({
                  text: error.message,
                  duration: SnackBar.LENGTH_SHORT
              });
              
              return false;
          }
          
      };

     loginUser(); 
     
  }else{
    setIsIndicator(false)
  }
  
}
//   async function handleSignIn() {
//     Keyboard.dismiss()
//     const isPhoneNumberValid = validateInput(
      
//       phoneNumber,
//       setPhoneError,
//     );
//     const isPasswordValid = validateInput(password, setPasswordError);
//     if (isPhoneNumberValid && isPasswordValid){
//         const formData=new FormData()
//         formData.append("mobile",phoneNumber)
//         formData.append("password",password)
// const loginUser=async()=>{
//     try{
//         const result = await axios({
//              url:LOGIN_URL,
//              method:"post",
//              data:formData,
//              headers:{
//                  Accept:"application/json",
//                  "content-type":"multipart/form-data"
//              }
//          })
//          SnackBar.show({
//             text:result.data.msg,
//             duration:SnackBar.LENGTH_SHORT
//          })
//         if (result.data?.sts === "01"){
//           setUserId(result.data?.user?.id)
//           async function storeData(){
//             try{
//               await AsyncStorage.setItem("userId",userId.toString())
//               console.log(userId,"login screen")
//               return true
//             }catch(error){
              
// setIsLoggedIn(false)
// return false
//             }
//           }
//           storeData()
          
//             // console.log("Login screen",result.data)
//         }else{
//           SnackBar.show({
//             text:result.data.msg,
//             duration:SnackBar.LENGTH_SHORT
//          })
//         }
//      }catch(error){
//          console.log("login screen", error.message)
//          SnackBar.show({
//             text:error.message,
//             duration:SnackBar.LENGTH_SHORT
//          })
//          return false
//      }

// }
// const isLoggedin = await loginUser()
// console.log(isLoggedin)
       
//     }


//   }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={-100} style={styles.container}>
   <ActivityIndicator style={styles.activityIndicator} animating={isIndicator} size="small" color="#7091A4"/>

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
        {phoneError && <ErrorText>Phone Number field required</ErrorText>}
        <CustomTextInput
          iconEnd="eye"
          iconStart="lock"
          onChangeText={value => setPassword(value)}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          placeholder="Enter Your Password"
          secureTextEntry={secureTextEntry}
          value={password}
        />
        {passwordError && <ErrorText>Password field required</ErrorText>}
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
  activityIndicator:{
    position:"absolute",
    top:"10%"
  }
});
