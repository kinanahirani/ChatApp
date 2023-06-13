// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from 'react-native';
// import ContactBox from '../components/ContactBox';

// const ChatScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           // justifyContent: 'flex-end',
//           marginTop: 14,
//           marginHorizontal: 25,
//           marginBottom: 29,
//         }}>
//         <TouchableOpacity>
//           <Image
//             source={require('../images/back-icon.png')}
//             style={{marginTop: 5}}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: 'rgba(15, 24, 40, 1)',
//             fontWeight: '600',
//             fontSize: 18,
//             marginLeft: 16,
//           }}>
//           Athalia Putri
//         </Text>
//         <View>
//           <View style={{flexDirection: 'row'}}>
//             <TouchableOpacity>
//               <Image
//                 source={require('../images/search-black.png')}
//                 style={{marginTop: 6.4}}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Image
//                 source={require('../images/nav.png')}
//                 style={{marginTop: 6.4}}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

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

import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const ChatScreen = ({navigation}) => {
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
              style={{marginTop:8.5}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Add your chat content here */}
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
    marginBottom: 29,
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
