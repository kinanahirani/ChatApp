import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={require('../images/Illustration.png')} />
        <View style={{width: 250, height: 90, marginTop: '5%'}}>
          <Text style={styles.text}>
            Connect easily with your family and friends over countries
          </Text>
          <TouchableOpacity activeOpacity={0.7}
            style={{alignItems: 'center', marginTop: '20%', height: 24}}>
            <Text style={{fontWeight:600, fontSize:14, color:'rgba(15, 24, 40, 1)'}}>Terms & Privacy Policy</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginHorizontal:25}}>
          <TouchableOpacity  activeOpacity={0.7} onPress={() => navigation.navigate('Login')}
            style={{ marginTop: 15, width:327, height: 50, backgroundColor:'#002DE3', borderRadius:30, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ color: '#F7F7FC', fontSize:16}}>Start Messaging</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  wrapper: {
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: 100,
  },
  text: {
    fontWeight: 700,
    fontSize: 24,
    textAlign: 'center',
    color:'rgba(15, 24, 40, 1)'
  },
});
