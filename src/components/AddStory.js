import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

const AddStory = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        marginBottom: 16,
        borderBottomColor: 'rgba(237, 237, 237, 1)',
        flexDirection: 'row',
      }}>
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

      <View style={{marginLeft: 16, marginBottom: 16}}>
        <View style={{width: 56, height: 56, marginBottom: 16}}>
          <TouchableOpacity activeOpacity={0.6}>
            <View style={styles.iconContainer}>
              <Image source={require('../images/dp.png')} style={styles.image}/>
            </View>
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: 'rgba(15, 24, 40, 1)',
              fontSize: 10,
              fontWeight: 400,
              textAlign: 'center',
            }}>
            Kinana Hirani
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginBottom: 16,
  },
  iconContainer: {
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(173, 181, 189, 1)',
    marginBottom: 4,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#F7F7FC',
    alignItems: 'center',
  },
  gradientContainer: {
    position: 'relative',
  },
  gradientBorder: {
    flex: 1,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  text: {
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default AddStory;
