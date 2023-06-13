import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';

const EnterContactDetails = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{marginTop: 20, marginLeft: 24}}>
        <Image source={require('../images/back-icon.png')} />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 140,
        }}>
        <Text
          style={{color: 'rgba(15, 24, 40, 1)', fontWeight: 700, fontSize: 24}}>
          Enter Your Phone Number
        </Text>
        <View style={{width: 295, height: 48, marginTop: 8, marginBottom: 48}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#0F1828',
              fontWeight: 400,
              fontSize: 14,
            }}>
            Please confirm your country code and enter your phone number
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '80%'}}>
          <PhoneInput
            defaultValue={phoneNumber}
            defaultCode="IN"
            codeTextStyle={styles.countryCodeText}
            textInputProps={{
              // placeholder: 'Phone Number',
              // placeholderTextColor: 'grey',
              style: styles.phoneInputTextInput,
            }}
            containerStyle={{
              height: 50,
              width: '100%',
            }}
            textContainerStyle={{
              justifyContent: 'center',
            }}
            onChangeFormattedText={text => {
              setPhoneNumber(text);
            }}
          />
          {/* <TextInput
            style={{
              backgroundColor: '#F7F7FC',
              width: 74,
              height: 36,
              borderRadius: 4,
            }}></TextInput> */}
          {/* <TextInput
            placeholder="Phone Number"
            style={{
              marginLeft: 8,
              backgroundColor: '#F7F7FC',
              width: 245,
              height: 36,
              borderRadius: 4,
            }}></TextInput> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Enter OTP')}
          style={{
            width: '90%',
            height: 52,
            backgroundColor: '#002DE3',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 81,
            marginHorizontal: 24,
          }}>
          <Text style={{color: '#F7F7FC', fontSize: 16}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterContactDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  phoneInputTextInput: {
    // backgroundColor: '#F7F7FC',
    width: '90%',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '700',
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 3.5,
    // fontWeight:'600',
  },
  countryCodeText: {
    justifyContent: 'center', // Align text vertically in the center
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Adjust the font size as desired

    // Other styles for the country code text
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import React, { useState } from 'react';
// import CountryPicker from 'react-native-country-picker-modal';

// const EnterContactDetails = () => {
//   const [countryCode, setCountryCode] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleCountryCodeSelect = (country) => {
//     setCountryCode(country.cca2);

//   };

//   const handleContinue = () => {
//     // Handle continue button click
//     console.log('Country Code:', countryCode);
//     console.log('Phone Number:', phoneNumber);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={{ marginTop: 20, marginLeft: 24 }}>
//         <Image source={require('../images/back-icon.png')} />
//       </TouchableOpacity>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 140,
//         }}>
//         <Text
//           style={{
//             color: 'rgba(15, 24, 40, 1)',
//             fontWeight: '700',
//             fontSize: 24,
//           }}>
//           Enter Your Phone Number
//         </Text>
//         <View style={{ width: 295, height: 48, marginTop: 8, marginBottom: 48 }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               color: '#0F1828',
//               fontWeight: '400',
//               fontSize: 14,
//             }}>
//             Please confirm your country code and enter your phone number
//           </Text>
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <CountryPicker
//             onSelect={handleCountryCodeSelect}
//             withFlag
//             withFilter
//             withCallingCode
//             countryCode={countryCode}
//             visible
//             translation="eng"
//             filterProps={{
//               placeholder: 'Search',
//             }}
//             onClose={() => {}}>
//             <View
//               style={{
//                 backgroundColor: '#F7F7FC',
//                 width: 74,
//                 height: 36,
//                 borderRadius: 4,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Text>{countryCode}</Text>
//             </View>
//           </CountryPicker>
//           <TextInput
//             placeholder="Phone Number"
//             style={{
//               marginLeft: 8,
//               backgroundColor: '#F7F7FC',
//               width: 245,
//               height: 36,
//               borderRadius: 4,
//             }}
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />
//         </View>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={{
//             width: 327,
//             height: 52,
//             backgroundColor: '#002DE3',
//             borderRadius: 30,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 81,
//             marginHorizontal: 24,
//           }}
//           onPress={handleContinue}>
//           <Text style={{ color: '#F7F7FC', fontSize: 16 }}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default EnterContactDetails;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     flex: 1,
//   },
// });
