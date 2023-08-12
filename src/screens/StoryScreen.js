import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {Colors} from '../../constants/Colors';
  
  const {width, height} = Dimensions.get('window');
  
  const StoryScreen = () => {
    const route = useRoute();
    const {item} = route.params;
  
    const navigation = useNavigation();
    const [story, setStory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      let unsubscribe = setTimeout(() => {
        navigation.goBack();
      }, 20000);
  
      return clearTimeout(unsubscribe);
    }, [currentIndex]);
  
    const onLeftTouch = () => {
      currentIndex > 0
        ? setCurrentIndex(currentIndex - 1)
        : setCurrentIndex(currentIndex);
    };
  
    const onRightTouch = () => {
      currentIndex < story.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : navigation.goBack();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{uri: item?.imageURL}} style={styles.image} />
  
        <View>
          <Text>{item.message}</Text>
        </View>
  
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.leftTouch}
            onPress={onLeftTouch}
            activeOpacity={1}>
            <View></View>
          </TouchableOpacity>
  
          <View></View>
  
          <TouchableOpacity
            style={styles.rightTouch}
            onPress={onRightTouch}
            activeOpacity={1}>
            <TouchableOpacity
              style={{marginTop: height / 10, marginLeft: width / 5}}
              onPress={() => navigation.goBack()}>
              <AntDesign name="close" size={24} color={Colors.white} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default StoryScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    image: {
      width: width,
      height: height,
      resizeMode: 'contain',
    },
    iconContainer: {
      zIndex: 9,
      width: width,
      height: '100%',
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftTouch: {
      width: '30%',
      height: '100%',
    },
    rightTouch: {
      width: '30%',
      height: '100%',
    },
  });