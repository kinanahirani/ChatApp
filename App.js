import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OnboardingScreen from './src/screens/OnboardingScreen'
import EnterContactDetails from './src/screens/EnterContactDetails'
import EnterOtp from './src/screens/EnterOtp'
import EnterUserDetails from './src/screens/EnterUserDetails'
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'

const App = () => {
  return (
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