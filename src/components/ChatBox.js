import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const ContactBox = ({navigation, user}) => {
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
          style={{borderRadius: 16, marginBottom: 16, borderRadius: 30}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Chat screen')}>
        <View style={{marginLeft: 16}}>
          <Text style={{fontWeight: '600', fontSize: 14, color: '#0F1828'}}>
            {user.firstName} {user.lastName}
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


