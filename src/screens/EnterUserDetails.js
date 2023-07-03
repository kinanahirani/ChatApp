import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const uploadProfilePicture = async (userId, profilePicture) => {
  const {path} = profilePicture;
  const email = await AsyncStorage.getItem('EMAIL');
  const imageRef = storage().ref(`Profile Pictures/${email}.jpg`);

  try {
    const response = await fetch(path);
    const blob = await response.blob();

    await imageRef.put(blob);
    const downloadUrl = await imageRef.getDownloadURL();
    console.log('Profile picture uploaded:', downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.log('Error uploading profile picture:', error);
    return null;
  }
};

const EnterUserDetails = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('USER_ID');
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const fetchedFirstName = userData.firstName || '';
        const fetchedLastName = userData.lastName || '';
        const fetchedProfilePic = userData.profilePicture || null;

        setFirstName(fetchedFirstName);
        setLastName(fetchedLastName);

        if (fetchedProfilePic) {
          const response = await fetch(fetchedProfilePic);
          const blob = await response.blob();
          const profilePictureObject = {
            path: fetchedProfilePic,
            data: blob._data,
          };
          setProfilePicture(profilePictureObject);
        }
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.log('Error fetching user details from Firestore:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserDetails();
    });

    return unsubscribe;
  }, [navigation]);

  const getEmail = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    return email;
  };

  useEffect(() => {
    getEmail();
  }, []);

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem('USER_ID');
    await updateUserDetails(userId, firstName, lastName);

    if (profilePicture) {
      const downloadUrl = await uploadProfilePicture(userId, profilePicture);
      await firestore().collection('users').doc(userId).update({
        profilePicture: downloadUrl,
      });
    }

    navigation.navigate('Bottom Tab');
  };

  const updateUserDetails = async (userId, firstName, lastName) => {
    try {
      const updateData = {};

      if (firstName) {
        await AsyncStorage.setItem('FNAME', firstName);
        // console.log(firstName,"..firstName");
        updateData.firstName = firstName;
      }

      if (lastName) {
        await AsyncStorage.setItem('LNAME', lastName);
        // console.log(lastName, "..lastName");
        updateData.lastName = lastName;
      }

      if (profilePicture) {
        await AsyncStorage.setItem(
          'PROFILE_PIC',
          profilePicture,
        );
        updateData.profilePicture = profilePicture;
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

  const handleMainPhotoUpload = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 500,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setProfilePicture(image);
      })
      .catch(error => {
        console.log(error);
      });
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
            fontWeight: '600',
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
        <TouchableOpacity onPress={handleMainPhotoUpload}>
          {profilePicture ? (
            <Image
              source={{uri: profilePicture.path}}
              style={styles.profileImage}
            />
          ) : (
            <View>
              <View
                style={{
                  backgroundColor: 'rgba(247, 247, 252, 1)',
                  borderRadius: 50,
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="user" size={50} color={'black'} />
              </View>
            </View>
          )}
          <View style={styles.addIconContainer}>
            <AntDesign name="pluscircle" size={24} color={'black'} />
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 33}}>
          <TextInput
            placeholder="First Name (Required)"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name (Optional)"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.saveButton}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
    color: 'black',
  },
  input: {
    backgroundColor: '#F7F7FC',
    width: 327,
    height: 36,
    borderRadius: 4,
    marginBottom: 12,
  },
  saveButton: {
    width: 327,
    height: 52,
    backgroundColor: '#002DE3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 81,
    marginHorizontal: 24,
  },
  saveButtonText: {
    color: '#F7F7FC',
    fontSize: 16,
  },
});
