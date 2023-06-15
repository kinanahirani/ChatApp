import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';

const EnterUserDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{marginTop: 20, marginLeft: 24}}>
          <Image source={require('../images/back-icon.png')} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 16,
            marginTop: 14,
            fontSize: 18,
            fontWeight: 600,
            color: 'rgba(15, 24, 40, 1)',
          }}>
          Your Profile
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 60,
        }}>
        <View>
          <Image source={require('../images/profile-img.png')} />
          <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <Image
              style={{alignSelf: 'flex-end'}}
              source={require('../images/plus.png')}
            />
          </View>
        </View>
        <View style={{marginTop:33}}>
          <TextInput
            placeholder="First Name (Required)"
            style={{
              backgroundColor: '#F7F7FC',
              width: 327,
              height: 36,
              borderRadius: 4,
              marginBottom:12
            }}></TextInput>
          <TextInput
            placeholder="Last Name (Optional)"
            style={{
              backgroundColor: '#F7F7FC',
              width: 327,
              height: 36,
              borderRadius: 4,
            }}></TextInput>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 327,
            height: 52,
            backgroundColor: '#002DE3',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 81,
            marginHorizontal: 24,
          }}
          onPress={()=>navigation.navigate('Bottom Tab')}>
          <Text style={{color: '#F7F7FC', fontSize: 16}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterUserDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
});
