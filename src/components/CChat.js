import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

const CChat = ({navigation, chat}) => {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        width: '90%',
      }}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={require('../images/dp.png')}
          style={{marginBottom: 12, borderRadius: 30}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Chat screen', {data: item, id: id})}>
        <View style={{marginLeft: 16, marginTop: 2}}>
          <Text style={{fontWeight: '600', fontSize: 14, color: '#0F1828'}}>
            Kinana Hirani
          </Text>
          <Text
            style={{
              marginTop: 2,
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

export default CChat;

