import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterUserDetails = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = () => {
    updateUserDetails(firstName, lastName);
    navigation.navigate('Bottom Tab');
  };

  const updateUserDetails = async (firstName, lastName) => {
    try {
      const userId = await AsyncStorage.getItem('USER_ID');
      const updateData = {};

      if (firstName) {
        updateData.firstName = firstName;
      }

      if (lastName) {
        updateData.lastName = lastName;
      }

      if (Object.keys(updateData).length > 0) {
        await firestore().collection('users').doc(userId).update(updateData);
        console.log('User details updated in Firestore');
      } else {
        console.log('No fields to update');
      }
    } catch (error) {
      console.log('Error updating user details in Firestore:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
        <View style={{marginTop: 33}}>
          <TextInput
            placeholder="First Name (Required)"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={{
              backgroundColor: '#F7F7FC',
              width: 327,
              height: 36,
              borderRadius: 4,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Last Name (Optional)"
            onChangeText={text => setLastName(text)}
            style={{
              backgroundColor: '#F7F7FC',
              width: 327,
              height: 36,
              borderRadius: 4,
            }}
          />
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
          onPress={() => handleSave()}>
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
