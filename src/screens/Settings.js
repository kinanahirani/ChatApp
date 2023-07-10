import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CSetting from '../components/CSetting';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('USER_ID');
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const fetchedFirstName = userData.firstName || '';
        const fetchedLastName = userData.lastName || '';
        const fetchedEmail = userData.email || '';
        const fetchedProfilePic = userData.profilePicture || null;

        setFirstName(fetchedFirstName);
        setLastName(fetchedLastName);
        setEmail(fetchedEmail);
        setPic(fetchedProfilePic);
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

  const handleLogout = async () => {
    try {
      // await auth().signOut();
      // await AsyncStorage.removeItem('EMAIL');
      // await AsyncStorage.removeItem('PASSWORD');
      const uid=await AsyncStorage.getItem('USER_ID');
      await firestore().collection('users').doc(uid).update({token:''})
      // await AsyncStorage.removeItem('FNAME');
      // await AsyncStorage.removeItem('LNAME');
      // if (await AsyncStorage.getItem('PROFILE_PIC')) {
      //   await AsyncStorage.removeItem('PROFILE_PIC');
      // }
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Logout Error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <View
        style={{
          marginTop: 14,
          marginHorizontal: 25,
          marginBottom: 29,
        }}>
        <Text
          style={{
            color: 'rgba(15, 24, 40, 1)',
            fontWeight: '600',
            fontSize: 18,
          }}>
          More
        </Text>
      </View>
      <View
        style={{alignItems: 'center', flexDirection: 'row', marginBottom: 31}}>
        {pic ? (
          <Image
            style={{height: 50, width: 50, marginLeft: 16, borderRadius: 50}}
            source={{uri: pic}}
          />
        ) : (
          <View
            style={{
              marginLeft: 16,
              width: 50,
              height: 50,
              backgroundColor: '#EDEDED',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="user" size={20} color={'rgba(15, 24, 40, 1)'} />
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Enter Profile Info')}>
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{color: '#0F1828', fontWeight: '600', fontSize: 14}}>
              {firstName} {lastName}
            </Text>
            <Text
              style={{
                color: '#ADB5BD',
                fontWeight: '400',
                fontSize: 12,
                marginTop: 2,
              }}>
              {email}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 'auto', marginRight: 24}}>
          <Feather
            name="chevron-right"
            size={20}
            color={'rgba(15, 24, 40, 1)'}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
        <CSetting icon={'AntDesign'} name={'Account'} iconName={'user'} />
        <CSetting
          icon={'Ionicons'}
          name={'Chats'}
          iconName={'chatbubble-outline'}
        />
        <CSetting icon={'Feather'} name={'Appereance'} iconName={'sun'} />
        <CSetting
          icon={'MaterialIcons'}
          name={'Notification'}
          iconName={'notifications-none'}
        />
        <CSetting
          icon={'MaterialCommunityIcons'}
          name={'Privacy'}
          iconName={'shield-alert-outline'}
        />
        <CSetting
          icon={'MaterialCommunityIcons'}
          name={'Data Usage'}
          iconName={'folder-outline'}
        />
        <CSetting
          icon={'MaterialIcons'}
          name={'Help'}
          iconName={'help-outline'}
        />
        <CSetting
          icon={'MaterialIcons'}
          name={'Invite Your Friends'}
          iconName={'forward-to-inbox'}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={logoutModalVisible}
          onRequestClose={() => {
            setLogoutModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to logout?
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonOpen, {marginRight: 10}]}
                  onPress={handleLogout}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setLogoutModalVisible(false)}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setLogoutModalVisible(true)}>
          <CSetting
            icon={'MaterialIcons'}
            name={'Logout'}
            iconName={'logout'}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(247, 247, 252, 1)',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
