import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import OnboardingScreen from './src/screens/OnboardingScreen'
import EnterContactDetails from './src/screens/EnterContactDetails'
import EnterOtp from './src/screens/EnterOtp'
import EnterUserDetails from './src/screens/EnterUserDetails'
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from './src/screens/SplashScreen'


const App = ({navigation}) => {
  return (
    // <SplashScreen/>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    // <OnboardingScreen/>
    // <EnterContactDetails/>
    // <EnterOtp/>
    // <EnterUserDetails/>
    // <View>
    //   <Text>App</Text>
    // </View>
  )
}

export default App

const styles = StyleSheet.create({})