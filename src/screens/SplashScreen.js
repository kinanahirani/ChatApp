import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  let navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLoggedInUser();
    }, 3000);
  }, []);

  const checkLoggedInUser = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const password = await AsyncStorage.getItem('PASSWORD');

    if (email && password) {
      navigation.navigate('Bottom Tab');
    } else {
      navigation.navigate('Onboarding Screen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={{}}>
          <Image source={require('../images/logo.png')} style={styles.logo} />
          {/* <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems:'center'}}>
            <Image source={require('../images/bluedot.png')} />
            <Image source={require('../images/bluedot.png')} />
            <Image source={require('../images/bluedot.png')} />
          </View> */}
        </View>
      </View>
    </View>
  );

  
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // Add any additional styles for the logo image here
  },
});
