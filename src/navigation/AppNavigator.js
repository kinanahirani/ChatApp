import React,{useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import EnterContactDetails from '../screens/EnterContactDetails';
import EnterOtp from '../screens/EnterOtp';
import EnterUserDetails from '../screens/EnterUserDetails';
import Contacts from '../screens/Contacts';
import ChatScreen from '../screens/ChatScreen';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import BottomTabNavigator from './BottomTabNavigator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import Chats from '../screens/Chats';
import CustomChatScreen from '../screens/CustomChatScreen';

const Stack=createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Onboarding Screen" component={OnboardingScreen}/>
        <Stack.Screen name="Enter Phone Number" component={EnterContactDetails}/>
        <Stack.Screen name="Enter OTP" component={EnterOtp}/>
        <Stack.Screen name="Enter Profile Info" component={EnterUserDetails}/>
        <Stack.Screen name="Contacts screen" component={Contacts}/>
        <Stack.Screen name="Chats screen" component={Chats}/>
        <Stack.Screen name="Chat screen" component={ChatScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name='Bottom Tab' component={BottomTabNavigator}/>
        <Stack.Screen name='Custom Chat' component={CustomChatScreen}/>
    </Stack.Navigator>
  )
}

export default AppNavigator