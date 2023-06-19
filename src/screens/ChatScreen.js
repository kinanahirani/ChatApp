// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';

// const ChatScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../images/back-icon.png')}
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Athalia Putri</Text>
//         <View style={styles.iconContainer}>
//           <TouchableOpacity style={styles.icon}>
//             <Image
//               source={require('../images/search-black.png')}
//               style={styles.iconImage}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.icon}>
//             <Image
//               source={require('../images/nav.png')}
//               style={{marginTop: 8.5}}
//             />
//           </TouchableOpacity>
//         </View>
//       </View><View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../images/back-icon.png')}
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Athalia Putri</Text>
//         <View style={styles.iconContainer}>
//           <TouchableOpacity style={styles.icon}>
//             <Image
//               source={require('../images/search-black.png')}
//               style={styles.iconImage}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.icon}>
//             <Image
//               source={require('../images/nav.png')}
//               style={{marginTop: 8.5}}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={{flex: 1}}>
//         {/* Add your chat content here */}
//       </View>
//       <View>
//         <TextInput placeholder="type message" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 14,
//     marginHorizontal: 25,
//     marginBottom: 29,
//   },
//   backIcon: {
//     // marginTop: 5,
//   },
//   headerTitle: {
//     color: 'rgba(15, 24, 40, 1)',
//     fontWeight: '600',
//     fontSize: 18,
//     marginLeft: 10,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     marginLeft: 'auto',
//   },
//   icon: {
//     marginLeft: 16,
//   },
//   iconImage: {
//     marginTop: 6.4,
//   },
// });

// export default ChatScreen;



import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { GiftedChat, InputToolbar, Composer } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  // const userId=AsyncStorage.getItem('USER_ID')

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('USER_ID');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    getUserId();
  }, []);


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }));
        setMessages(data);
      });

    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages = []) => {
    const messagesToBeSent = newMessages.map((message) => ({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    }));

    try {
      await Promise.all(
        messagesToBeSent.map((message) =>
          firestore().collection('chats').add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
          })
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image
            source={require('../images/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Athalia Putri</Text>
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
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend}
        messagesContainerStyle={{
          backgroundColor: 'rgba(247, 247, 252, 1)'
        }}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
}

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
        elevation:7
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
