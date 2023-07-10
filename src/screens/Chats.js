import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddStory from '../components/AddStory';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Chats = ({navigation}) => {
  const [chattedUsers, setChattedUsers] = useState([]);
  const [userId, setUserId] = useState('');

  console.log(userId, 'userId');

  useEffect(() => {
    getChattedUsers();
  }, []);

  const getChattedUsers = async () => {
    try {
      const userId = await AsyncStorage.getItem('USER_ID');
      const listRef = firestore()
        .collection('chatUsers')
        .doc('list')
        .collection(userId)
        .orderBy('createdAt', 'desc');

      listRef.onSnapshot(async querySnap => {
        const allMsg = querySnap?.docs.map(docsnap => {
          return {
            ...docsnap.data(),
          };
        });
        console.log(allMsg,"allMsg");
        setChattedUsers(allMsg);
        setUserId(userId);
      });
    } catch (err) {
      console.log('Error(getChattedUsers): ', err);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <View
        style={{
          flexDirection: 'row',
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
          Chats
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
          <TouchableOpacity>
            <View style={{marginTop: 5, width: 19, height: 19}}>
              <MaterialCommunityIcons
                name="message-plus-outline"
                size={19}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../images/line-right.png')}
              style={{marginTop: 8, marginLeft: 12, width: 20, height: 13}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AddStory />
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        {chattedUsers ? (
          chattedUsers.map(item => (
            <View
              key={item._id}
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: '90%',
              }}>
              {item.profilePicture ? (
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    source={{uri: item.profilePicture}}
                    style={{
                      marginBottom: 12,
                      borderRadius: 30,
                      height: 56,
                      width: 56,
                    }}
                  />
                </TouchableOpacity>
              ) : item.profilePic.path ? (
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    source={{uri: item.profilePic.path}}
                    style={{
                     marginBottom: 12,
                     borderRadius: 30,
                    height: 56,
                    width: 56,
                   }}
                  />
                </TouchableOpacity>
              ) 
              : item.profilePic ? (
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    source={{uri: item.profilePic}}
                    style={{
                      marginBottom: 12,
                      borderRadius: 30,
                      height: 56,
                      width: 56,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: 'rgba(237, 237, 237, 1)',
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                    marginBottom: 12,
                  }}>
                  <AntDesign name="user" size={24} color={'black'} />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('Chat screen', {
                    data: item,
                    id: userId,
                    screen: 'chat',
                  })
                }>
                <View style={{marginLeft: 16, marginTop: 2}}>
                  <Text
                    style={{fontWeight: '600', fontSize: 14, color: '#0F1828'}}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      color: '#ADB5BD',
                      fontWeight: '400',
                      fontSize: 12,
                    }}>
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              No chats to show here.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Chats;

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
});
