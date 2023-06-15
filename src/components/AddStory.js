import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const AddStory = () => {
  return (
    <View style={{borderBottomWidth: 1, marginBottom:16, borderBottomColor:'rgba(237, 237, 237, 1)'}}>
      <View style={styles.container}>
        <View style={{width: 56, height: 56, marginBottom: 16}}>
          <TouchableOpacity activeOpacity={0.6}>
            <View style={styles.iconContainer}>
              <Entypo name="plus" size={21} color="#ADB5BD" />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: 'rgba(15, 24, 40, 1)',
              fontSize: 10,
              fontWeight: 400,
              textAlign: 'center',
            }}>
            Your Story
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  iconContainer: {
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(173, 181, 189, 1)',
    marginBottom: 4,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7FC',
  },
  text: {
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default AddStory;
