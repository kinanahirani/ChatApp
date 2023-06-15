import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import ContactBox from '../components/ContactBox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddStory from '../components/AddStory';

const Contacts = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
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
            <View style={{marginTop: 5, width:19, height:19}}>
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
              style={{marginTop: 8, marginLeft:12, width:20, height:13}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AddStory/>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <ContactBox navigation={navigation} />
        <ContactBox navigation={navigation} />
        <ContactBox navigation={navigation} />
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
