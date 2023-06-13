import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import EnterContactDetails from '../screens/EnterContactDetails';
import EnterOtp from '../screens/EnterOtp';
import EnterUserDetails from '../screens/EnterUserDetails';
import Contacts from '../screens/Contacts';
import ChatScreen from '../screens/ChatScreen';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';

const Stack=createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Onboarding Screen'>
        <Stack.Screen name="Onboarding Screen" component={OnboardingScreen}/>
        <Stack.Screen name="Enter Phone Number" component={EnterContactDetails}/>
        <Stack.Screen name="Enter OTP" component={EnterOtp}/>
        <Stack.Screen name="Enter Profile Info" component={EnterUserDetails}/>
        <Stack.Screen name="Contacts screen" component={Contacts}/>
        <Stack.Screen name="Chat screen" component={ChatScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
  )
}

export default AppNavigator

