import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userSnapshot = await firestore()
          .collection('users')
          .doc(route.params.data.userId)
          .get();

        if (userSnapshot.exists) {
          setUserDetails(userSnapshot.data());
        } else {
          console.log('not getting the data');
        }
      } catch {
        console.log('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    const chatId1 = `${route.params.id}-${route.params.data.userId}`;
    const chatId2 = `${route.params.data.userId}-${route.params.id}`;

    const subscriber = firestore()
      .collection('chats')
      .doc(chatId1)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => {
          const {_id, text, createdAt, user} = doc.data();
          return {
            _id,
            text,
            createdAt: createdAt.toDate(),
            user,
          };
        });
        setMessages(allMessages);
      });

    return () => subscriber();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const msg = newMessages[0];
    const chatId1 = `${route.params.id}-${route.params.data.userId}`;
    const chatId2 = `${route.params.data.userId}-${route.params.id}`;

    const message = {
      _id: msg._id,
      text: msg.text,
      senderId: route.params.id,
      receiverId: route.params.data.userId,
      createdAt: firestore.Timestamp.fromDate(msg.createdAt),
      user: msg.user,
    };

    try {
      await Promise.all([
        firestore()
          .collection('chats')
          .doc(chatId1)
          .collection('messages')
          .add(message),
        firestore()
          .collection('chats')
          .doc(chatId2)
          .collection('messages')
          .add(message),
      ]);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }, []);

  let avatar;
  if (userDetails && userDetails.profilePicture) {
    avatar = userDetails.profilePicture
  } else {
    avatar = 'https://firebasestorage.googleapis.com/v0/b/chatapp-ddd26.appspot.com/o/Profile%20Pictures%2Fdefault.png?alt=media&token=57345098-ef98-44e7-bf3c-f701f41a4486';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {route.params.data.firstName} {route.params.data.lastName}
        </Text>
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

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={false}
        messagesContainerStyle={{
          backgroundColor: 'rgba(247, 247, 252, 1)',
        }}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
          avatar: avatar
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
