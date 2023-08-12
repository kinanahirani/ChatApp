import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ContactBox from '../components/ContactBox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Contacts = ({navigation}) => {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('USER_ID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          Contacts
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../images/plus-icon.png')}
            style={{marginTop: 6.4}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View
          style={{
            width: '90%',
          }}>
          <FlatList
            data={users}
            renderItem={({item, index}) => {
              return (
                <View
                key={index}
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#EDEDED',
                  }}>
                  <TouchableOpacity activeOpacity={0.7}>
                    {item.profilePicture ? (
                      <Image
                        source={{uri: item.profilePicture}}
                        style={{
                          height: 48,
                          width: 48,
                          marginBottom: 12,
                          borderRadius: 30,
                        }}
                      />
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      navigation.navigate('Chat screen', {item: item, id: id})
                    }>
                    <View style={{marginLeft: 16}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#0F1828',
                        }}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          color: '#ADB5BD',
                          fontWeight: '400',
                          fontSize: 12,
                        }}>
                        Last seen yesterday
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {/* {filteredUsers.map(user => (
            <ContactBox key={user.userId} navigation={navigation} user={user} />
          ))} */}
        </View>
        {/* <View style={{marginVertical:20, flexDirection:'row', width:'90%', borderBottomWidth:1, borderBottomColor:'#EDEDED'}}>
          <Image source={require('../images/dp.png')} style={{borderRadius:16, marginBottom:16}}/>
          <View style={{marginLeft:16}}>
            <Text style={{fontWeight:'600', fontSize:14, color:'#0F1828'}}>Athalia Putri</Text>
            <Text style={{marginTop:5, color:'#ADB5BD', fontWeight:'400', fontSize:12}}>Last seen yesterday</Text>
          </View> */}
      </View>
    </View>
  );
};

export default Contacts;

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
    color: 'black',
    paddingVertical: 10,
  },
});
