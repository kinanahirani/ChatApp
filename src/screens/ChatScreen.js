import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {GiftedChat, Composer} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState('');
  const defaultImg =
    'https://firebasestorage.googleapis.com/v0/b/chatapp-ddd26.appspot.com/o/Profile%20Pictures%2Fdefault.png?alt=media&token=57345098-ef98-44e7-bf3c-f701f41a4486';

  console.log(JSON.stringify(route.params), 'route.params');

  const onMessageReceived = ({message}) => {
    // Get the user details for the sender of the message.
    const getUserDetails = async () => {
      console.log(message.senderId,"message.senderId");
      const userSnapshot = await firestore()
        .collection('users')
        .doc(message.senderId)
        .get();

      if (userSnapshot.exists) {
        setUserDetails(userSnapshot.data());
      }
    };
    getUserDetails();
  };


  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    let token = await messaging().getToken();
    setToken(token);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (route.params.id) {
          const userSnapshot = await firestore()
            .collection('users')
            .doc(route.params.id)
            .get();

          if (userSnapshot.exists) {
            setUserDetails(userSnapshot.data());
          }
        } else if (route.params.data.senderId) {
          const userSnapshot1 = await firestore()
            .collection('users')
            .doc(route.params.data.senderId)
            .get();

          if (userSnapshot1.exists) {
            setUserDetails({
              ...userSnapshot1.data(),
              firstName: route.params.data.firstName,
              lastName: route.params.data.lastName,
            });
          }
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
    let receiver;
    if (route.params.item) {
      receiver = route.params.item.userId;
    } else {
      console.log(
        route.params.data.receiverId,
        '...route.params.data.receiverId',
      );
      receiver = route.params.data.receiverId;
    }

    let sender;
    if (route.params.id) {
      sender = route.params.id;
    } else {
      sender = route.params.data.senderId;
    }

    const chatId1 = `${sender}-${receiver}`;
    const chatId2 = `${receiver}-${sender}`;

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
        console.log(messages, 'messages when renders');
      });
    return () => subscriber();
  }, [route.params.id, route.params.data, route.params.item]);

  const sendNotifications = async (token, messageText, id) => {
    var NotiFicationData = JSON.stringify({
      notification: {
        body: messageText,
        title: route.params.item.firstName || route.params.data.firstName,
      },
      data: {
        messageId: id,
      },
      to: token,
    });

    axios
      .post('https://fcm.googleapis.com/fcm/send', NotiFicationData, {
        headers: {
          Authorization:
            'Bearer AAAAQtNff-8:APA91bHkBx4BHauuE9-ywCYS6rcozQ4NSfXK1yFrqubGv3ZRoeeVCWU3RWZHIFLLmsQnGYWhaCQJxk_b_f5CuHTsZINtPq1nL3vDijp2dxAB_FSLH450oe9xZyeXsQHJf19d-xkdSzJ7',
          'Content-Type': 'application/json',
        },
      })
      .then(function (res) {
        console.log(JSON.stringify(res.data), 'Notification Data:');
      })
      .catch(function (err) {
        console.log(err, 'errrr');
      });
  };

  const onSend = useCallback(
    async (newMessages = []) => {
      let firstName;
      let lastName;
      const uniqId = Math.random().toString().substr(2, 10);

      if (userDetails) {
        firstName = userDetails.firstName;
        lastName = userDetails.lastName;
      } else {
        firstName = route.params.data.firstName || 'Unknown';
        lastName = route.params.data.lastName || 'User';
      }

      let receiver;
      if (route.params.item) {
        receiver = route.params.item.userId;
      } else {
        receiver = route.params.data.receiverId;
      }
      let sender;
      if (route.params.id) {
        sender = route.params.id;
      } else {
        sender = route.params.data.senderId;
      }

      const msg = newMessages[0];
      const chatId1 = `${sender}-${receiver}`;
      const chatId2 = `${receiver}-${sender}`;

      let token;
      if (route.params.item) {
        token = route.params.item.token;
      } else if (route.params.data) {
        token = route.params.data.token;
      }

      const message = {
        _id: msg._id,
        text: msg.text,
        senderId: sender,
        receiverId: receiver,
        token: token,
        createdAt: firestore.Timestamp.fromDate(msg.createdAt),
        user: msg.user,
      };
      if (userDetails) {
        console.log(userDetails.firstName, '...userDetails.firstName1');
        console.log(userDetails.lastName, '...userDetails.lastName1');
      } else {
        console.log('User details are null');
      }

      try {
        await Promise.all([
          firestore()
            .collection('chats')
            .doc(chatId1)
            .collection('messages')
            .add({
              ...message,
              firstName: route.params.item?.firstName || firstName,
              lastName: route.params.item?.lastName || lastName,
            }),
          firestore()
            .collection('chats')
            .doc(chatId2)
            .collection('messages')
            .add({
              ...message,
              firstName: route.params.item?.firstName || firstName,
              lastName: route.params.item?.lastName || lastName,
              // firstName: userDetails.firstName,
              // lastName: userDetails.lastName,
            }),
        ]);

        sendNotifications(
          route.params.item.token || route.params.data.token,
          msg.text,
          uniqId,
        );

        const chatUsersRef1 = firestore()
          .collection('chatUsers')
          .doc('list')
          .collection(sender)
          .doc(receiver);

        let profilePictureReceiver;
        if (route.params.item.profilePicture) {
          profilePictureReceiver = route.params.item.profilePicture;
        } else {
          profilePictureReceiver = defaultImg;
        }

        chatUsersRef1.get().then(res => {
          if (res.exists) {
            chatUsersRef1.update({
              ...message,
              firstName:
                route.params.item.firstName || route.params.data.firstName,
              lastName:
                route.params.item.lastName || route.params.data.lastName,
              profilePicture: profilePictureReceiver,
            });
          } else {
            chatUsersRef1.set({
              ...message,
              firstName:
                route.params.item.firstName || route.params.data.firstName,
              lastName:
                route.params.item.lastName || route.params.data.lastName,
              profilePicture: profilePictureReceiver,
            });
          }
        });

        const chatUsersRef2 = firestore()
          .collection('chatUsers')
          .doc('list')
          .collection(receiver)
          .doc(sender);

        chatUsersRef2.get().then(async res => {
          const firstName = await AsyncStorage.getItem('FNAME');
          const lastName = await AsyncStorage.getItem('LNAME');
          const profilePictureString = await AsyncStorage.getItem(
            'PROFILE_PIC',
          );
          let profilePicture;
          if (profilePictureString) {
            profilePicture = JSON.parse(profilePictureString);
          } else {
            profilePicture = defaultImg;
          }
          if (res.exists) {
            chatUsersRef2.update({
              ...message,
              firstName: firstName,
              // || route.params.data.firstName,
              lastName: lastName,
              // || route.params.data.lastName,
              profilePic: profilePicture,
            });
          } else {
            chatUsersRef2.set({
              ...message,
              firstName: firstName,
              // || route.params.data.firstName,
              lastName: lastName,
              // || route.params.data.lastName,
              profilePic: profilePicture,
            });
          }
        });
      } catch (error) {
        console.error('Error sending message: ', error);
      }
    },
    [route.params, userDetails],
  );

  const renderChatEmpty = () => <View style={styles.emptyChatContainer}></View>;

  let avatar;
  if (userDetails && userDetails.profilePicture) {
    avatar = userDetails.profilePicture;
  } else {
    avatar =
      'https://firebasestorage.googleapis.com/v0/b/chatapp-ddd26.appspot.com/o/Profile%20Pictures%2Fdefault.png?alt=media&token=57345098-ef98-44e7-bf3c-f701f41a4486';
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
          {route.params.item?.firstName || route.params.data?.firstName}{' '}
          {route.params.item?.lastName || route.params.data?.lastName}
        </Text>
        {/* {route.params.item.firstName ? (
          <Text style={styles.headerTitle}>
            {route.params.item.firstName} {route.params.item.lastName}
          </Text>
        ) :(
          <Text style={styles.headerTitle}>
            {route.params.data.firstName} {route.params.data.lastName}
          </Text>
        )} */}
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

      <View style={{flex: 1}}>
        <Image
          source={require('../images/chat_bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          showUserAvatar={false}
          onMessageReceived={onMessageReceived}
          // messagesContainerStyle={{
          //   backgroundColor: 'rgba(247, 247, 252, 1)',
          // }}
          onSend={messages => onSend(messages)}
          user={{
            _id: route.params.id,
            avatar: avatar,
          }}
          renderChatEmpty={renderChatEmpty}
          // keyExtractor={message => message._id.toString()}
        />
      </View>
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
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default ChatScreen;
