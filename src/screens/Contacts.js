import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import ContactBox from '../components/ContactBox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contacts = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersSnapshot = await firestore().collection('users').get();
  //       const usersData = usersSnapshot.docs.map(doc => doc.data());
  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    getUsers();
  }, []);

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

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchText.toLowerCase()),
  );

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
        <ScrollView
          style={{
            width: '90%',
          }}>
          <FlatList
            data={users}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#EDEDED',
                  }}>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Image
                      source={require('../images/dp.png')}
                      style={{
                        borderRadius: 16,
                        marginBottom: 16,
                        borderRadius: 30,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Chat screen', {data:item, id:id})}>
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
        </ScrollView>
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
    paddingVertical: 10,
  },
});
