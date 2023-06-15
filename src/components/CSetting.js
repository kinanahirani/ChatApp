// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

// const CSetting = () => {
//   return (
//     <TouchableOpacity activeOpacity={0.7}>
//       <View style={{alignItems: 'center', flexDirection: 'row'}}>
//         <View
//           style={{
//             width: 50,
//             height: 50,
//             borderRadius: 50,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <AntDesign name="user" size={20} color={'rgba(15, 24, 40, 1)'} />
//         </View>
//         <Text style={{color: '#0F1828', fontWeight: '600', fontSize: 14}}>
//           Account
//         </Text>
//         <View style={{marginLeft: 'auto', marginRight: 24}}>
//           <Feather
//             name="chevron-right"
//             size={20}
//             color={'rgba(15, 24, 40, 1)'}
//           />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default CSetting;

// const styles = StyleSheet.create({});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CSetting = ({icon, name, iconName}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'AntDesign':
        return (
          <AntDesign name={iconName} size={20} color={'rgba(15, 24, 40, 1)'} />
        );
      case 'Feather':
        return (
          <Feather name={iconName} size={20} color={'rgba(15, 24, 40, 1)'} />
        );
      case 'Ionicons':
        return (
          <Ionicons name={iconName} size={20} color={'rgba(15, 24, 40, 1)'} />
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons
            name={iconName}
            size={20}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
        case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={'rgba(15, 24, 40, 1)'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.arrowContainer}>
          <Feather
            name="chevron-right"
            size={20}
            color={'rgba(15, 24, 40, 1)'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CSetting;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0F1828',
    fontWeight: '600',
    fontSize: 14,
  },
  arrowContainer: {
    marginLeft: 'auto',
    marginRight: 24,
  },
});
