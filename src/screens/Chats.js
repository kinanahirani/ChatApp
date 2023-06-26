import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddStory from '../components/AddStory';
import CChat from '../components/CChat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chats = ({navigation}) => {
  const [chattedUsers, setChattedUsers] = useState(null);

  const getChattedUsers = async () => {
    try {
      const userId = await AsyncStorage.getItem('USER_ID');
      const snapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', userId)
        .get();

      const users = snapshot.docs.map(doc => {
        const chatId = doc.id;
        const otherUserId = doc.data().participants.find(id => id !== userId);
        return {chatId, otherUserId};
      });

      setChattedUsers(users);
    } catch (err) {
      console.log('Error(getChattedUsers): ', err);
    }
  };

  useEffect(() => {
    getChattedUsers();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}
      behavior="height">
      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          marginHorizontal: 25,
          marginBottom: 29,
        }}>
        <Text
          style={{
            color: 'rgba(15, 24, 40, 1)',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Chats
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
          <TouchableOpacity>
            <View style={{marginTop: 5, width: 19, height: 19}}>
              <MaterialCommunityIcons
                name="message-plus-outline"
                size={19}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../images/line-right.png')}
              style={{marginTop: 8, marginLeft: 12, width: 20, height: 13}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AddStory />
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        {chattedUsers.map(user => (
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
              onPress={() =>
                navigation.navigate('Chat screen', {data: item, id: id})
              }>
              <View style={{marginLeft: 16, marginTop: 2}}>
                <Text
                  style={{fontWeight: '600', fontSize: 14, color: '#0F1828'}}>
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
        ))}
        {/*   <TouchableOpacity
            key={user.chatId}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                id: user.chatId,
                data: { userId: user.otherUserId },
              })
            }
          >
        <CChat navigation={navigation} />
          </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(247, 247, 252, 1)',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   SafeAreaView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AddStory from '../components/AddStory';
// import CChat from '../components/CChat';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Chats = ({navigation}) => {
//   const [chattedUsers, setChattedUsers] = useState([]);

//   useEffect(() => {
//     getChattedUsers();
//   }, []);

//   const getChattedUsers = async () => {
//     try {
//       const userId = await AsyncStorage.getItem('USER_ID');
//       const snapshot = await firestore()
//         .collection('chats')
//         .where('userId', 'array-contains', userId)
//         .get();

//       const users = snapshot.docs.map(doc => {
//         const chatId = doc.id;
//         const otherUserId = chatId.replace(userId, '').replace('-', '');
//         // const userId1 = chatId.split('-')[0];
//         // const userId2 = chatId.split('-')[1];
//         return {
//           chatId,
//           otherUserId
//         };
//       });

//       const searchedUsers = await Promise.all(
//         users.map(async user => {
//           const userDocument = await firestore()
//             .collection('users')
//             .doc(user.otherUserId)
//             .get();
//           if (userDocument.exists) {
//             return userDocument.data();
//           }
//         }),
//       );
//       console.log(searchedUsers, "....fetchedUsers");
//       setChattedUsers(searchedUsers.filter(Boolean));
//     } catch (err) {
//       console.log('Error(getChattedUsers): ', err);
//     }
//   };

//   const renderChats = () => {
//     return chattedUsers.map(user => (
//       <TouchableOpacity
//         key={user.id}
//         onPress={() =>
//           navigation.navigate('ChatScreen', {
//             id: user.id,
//             data: {userId: user.otherUserId},
//           })
//         }>
//         <CChat navigation={navigation} />
//       </TouchableOpacity>
//     ));
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}
//       behavior="height">
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 14,
//           marginHorizontal: 25,
//           marginBottom: 29,
//         }}>
//         <Text
//           style={{
//             color: 'rgba(15, 24, 40, 1)',
//             fontWeight: '600',
//             fontSize: 18,
//           }}>
//           Chats
//         </Text>
//         <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
//           <TouchableOpacity>
//             <View style={{marginTop: 5, width: 19, height: 19}}>
//               <MaterialCommunityIcons
//                 name="message-plus-outline"
//                 size={19}
//                 color={'black'}
//               />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Image
//               source={require('../images/line-right.png')}
//               style={{marginTop: 8, marginLeft: 12, width: 20, height: 13}}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <AddStory />
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <ScrollView>{renderChats()}</ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default Chats;

// const styles = StyleSheet.create({
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '90%',
//     backgroundColor: 'rgba(247, 247, 252, 1)',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 10,
//   },
// });
