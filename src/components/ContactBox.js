import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

const ContactBox = ({navigation}) => {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
      }}>
      <Image
        source={require('../images/dp.png')}
        style={{borderRadius: 16, marginBottom: 16}}
      />
      <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate('Chat screen')}>
      <View style={{marginLeft: 16}}>
        <Text style={{fontWeight: '600', fontSize: 14, color: '#0F1828'}}>
          Athalia Putri
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
};

export default ContactBox;
