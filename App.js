// import {
//   onMsg,
//   createChannelfunc,
//   backgroundMessage,
//   requestUserPermission,
// } from './src/helper/notification.helper';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

const App = () => {
  // useEffect(() => {
  //   onMsg();
  //   createChannelfunc();
  //   backgroundMessage();
  //   requestUserPermission();
  // }, []);

  return (
    <InternetConnectionAlert
      title={'Internet Connection Lost'}
      message={'Your device is not connected with the internet'}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </InternetConnectionAlert>
  );
};

export default App;

const styles = StyleSheet.create({});
