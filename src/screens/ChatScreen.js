import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {GiftedChat, InputToolbar, Composer} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';

const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const getUserId = async () => {
  //     try {
  //       const storedUserId = await AsyncStorage.getItem('USER_ID');
  //       setUserId(storedUserId);
  //     } catch (error) {
  //       console.error('Error retrieving user ID:', error);
  //     }
  //   };

  //   getUserId();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('chats')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => ({
  //         _id: doc.id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text,
  //         user: doc.data().user,
  //       }));
  //       setMessages(data);
  //     });

  //   return () => unsubscribe();
  // }, []);

  // const onSend = async (newMessages = []) => {
  //   const messagesToBeSent = newMessages.map(message => ({
  //     _id: message._id,
  //     createdAt: message.createdAt,
  //     text: message.text,
  //     user: message.user,
  //   }));

  //   try {
  //     await Promise.all(
  //       messagesToBeSent.map(message =>
  //         firestore().collection('chats').add({
  //           _id: message._id,
  //           createdAt: message.createdAt,
  //           text: message.text,
  //           user: message.user,
  //         }),
  //       ),
  //     );
  //   } catch (error) {
  //     console.error('Error sending message: ', error);
  //   }
  // };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      senderId: route.params.id,
      receiverId: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kinana Hirani</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require('../images/search-black.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require('../images/nav.png')}
              style={{marginTop: 8.5}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend}
        messagesContainerStyle={{
          backgroundColor: 'rgba(247, 247, 252, 1)',
        }}
        user={{
          _id: userId,
          avatar: 'https://i.pravatar.cc/300',
        }}
      /> */}
      <GiftedChat
        messages={messages}
        messagesContainerStyle={{
          backgroundColor: 'rgba(247, 247, 252, 1)',
        }}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginHorizontal: 25,
    marginBottom: 17,
    elevation: 7,
  },
  backIcon: {
    // marginTop: 5,
  },
  headerTitle: {
    color: 'rgba(15, 24, 40, 1)',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginLeft: 16,
  },
  iconImage: {
    marginTop: 6.4,
  },
});

export default ChatScreen;
