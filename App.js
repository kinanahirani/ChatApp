import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {
  backgroundMessage,
  createChannelfunc,
  onMsg,
  requestUserPermission,
} from './src/helper/notification.helper';

const App = () => {
  useEffect(() => {
    createChannelfunc();
    backgroundMessage();
    requestUserPermission();
    onMsg();
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
