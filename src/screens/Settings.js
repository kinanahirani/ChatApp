import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CSetting from '../components/CSetting';

const Settings = ({navigation}) => {
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
      <View style={{alignItems: 'center', flexDirection: 'row', marginBottom:31}}>
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
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={{color:'#0F1828', fontWeight:'600', fontSize:14}}>Almayra Zamzamy</Text>
          <Text style={{color:'#ADB5BD', fontWeight:'400', fontSize:12, marginTop:2}}>+62 1309 - 1710 - 1920</Text>
        </View>
        <View style={{marginLeft:'auto', marginRight:24}}>
          <TouchableOpacity activeOpacity={0.7}>
            <Feather
              name="chevron-right"
              size={20}
              color={'rgba(15, 24, 40, 1)'}
            />
          </TouchableOpacity>
        </View>
      </View>

{/* 
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="user" size={20} color={'rgba(15, 24, 40, 1)'} />
        </View>
        <Text style={{color:'#0F1828', fontWeight:'600', fontSize:14}}>Account</Text>
        <View style={{marginLeft:'auto', marginRight:24}}>
          <TouchableOpacity activeOpacity={0.7}>
            <Feather
              name="chevron-right"
              size={20}
              color={'rgba(15, 24, 40, 1)'}
            />
          </TouchableOpacity>
        </View>
      </View> */}

      <CSetting icon={"AntDesign"} name={'Account'} iconName={'user'}/>
      <CSetting icon={"Ionicons"} name={'Chats'} iconName={'chatbubble-outline'}/>
      <CSetting icon={"Feather"} name={'Appereance'} iconName={'sun'}/>
      <CSetting icon={"MaterialIcons"} name={'Notification'} iconName={'notifications-none'}/>
      <CSetting icon={"MaterialCommunityIcons"} name={'Privacy'} iconName={'shield-alert-outline'}/>
      <CSetting icon={"MaterialCommunityIcons"} name={'Data Usage'} iconName={'folder-outline'}/>
      <CSetting icon={"MaterialIcons"} name={'Help'} iconName={'help-outline'}/>
      <CSetting icon={"MaterialIcons"} name={'Invite Your Friends'} iconName={'forward-to-inbox'}/>

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
});
