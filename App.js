import {View, Text} from 'react-native';
import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// custom import
import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import {
  UserContext,
  UserDataContextProvider,
} from './app/utils/userDataContext';

const AuthStack = createNativeStackNavigator();
const Mainstack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown:false
    }}>
      <AuthStack.Screen name="Login" component={LoginScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <Mainstack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Mainstack.Screen name="Home" component={HomeScreen} />
    </Mainstack.Navigator>
  );
}

function CombinedStack() {

const {isLoading,isLoggedIn}=useContext(UserContext)

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <MainStackScreen />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
<UserDataContextProvider>
  <CombinedStack/>
</UserDataContextProvider>
  );
}
