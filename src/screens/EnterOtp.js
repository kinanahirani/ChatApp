// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';

// const EnterOtp = ({navigation}) => {
//   // const image=<Image source={require('../images')}/>
//   const [otp, setOtp] = useState('');

//   const handleOtpChange = (index, value) => {
//     const newOtp = otp.split('');
//     newOtp[index] = value;
//     setOtp(newOtp.join(''));
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={{marginTop: 20, marginLeft: 24}}>
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
//           Enter Code
//         </Text>
//         <View style={{width: 261, height: 48, marginTop: 8, marginBottom: 48}}>
//           <Text
//             style={{
//               textAlign: 'center',
//               color: '#0F1828',
//               fontWeight: '400',
//               fontSize: 14,
//             }}>
//             We have sent you an SMS with the code to +62 1309 - 1710 - 1920{' '}
//           </Text>
//         </View>
//         <View style={styles.otpContainer}>
//           <TextInput
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="numeric"
//             value={otp[0]}
//             onChangeText={value => handleOtpChange(0, value)}
//           />
//           <TextInput
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="numeric"
//             value={otp[1]}
//             onChangeText={value => handleOtpChange(1, value)}
//           />
//           <TextInput
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="numeric"
//             value={otp[2]}
//             onChangeText={value => handleOtpChange(2, value)}
//           />
//           <TextInput
//             style={styles.otpInput}
//             maxLength={1}
//             keyboardType="numeric"
//             value={otp[3]}
//             onChangeText={value => handleOtpChange(3, value)}
//           />
//         </View>
//         <TouchableOpacity
//         onPress={()=>navigation.navigate('Enter Profile Info')}
//           activeOpacity={0.7}
//           style={{
//             width: 327,
//             height: 52,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 81,
//           }}>
//           <Text
//             style={{
//               color: 'rgba(0, 45, 227, 1)',
//               fontSize: 16,
//               fontWeight: '600',
//             }}>
//             Resend Code
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     flex: 1,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//   },
//   otpInput: {
//     flex: 1,
//     width: 48,
//     height: 48,
//     borderRadius: 4,
//     // marginRight: 0,
//     textAlign: 'center',
//     fontSize: 24,
//   },
// });

// export default EnterOtp;

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const EnterOtp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const otpInputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (!value && index > 0) {
      otpInputRefs.current[index - 1].focus();
    } else if (index < otpInputRefs.current.length - 1 && value) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{marginTop: 20, marginLeft: 24}}>
        <Image source={require('../images/back-icon.png')} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Code</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            We have sent you an SMS with the code to +62 1309 - 1710 - 1920
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[0]}
            onChangeText={value => handleOtpChange(0, value)}
            ref={ref => (otpInputRefs.current[0] = ref)}
            autoFocus
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[1]}
            onChangeText={value => handleOtpChange(1, value)}
            ref={ref => (otpInputRefs.current[1] = ref)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[2]}
            onChangeText={value => handleOtpChange(2, value)}
            ref={ref => (otpInputRefs.current[2] = ref)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[3]}
            onChangeText={value => handleOtpChange(3, value)}
            ref={ref => (otpInputRefs.current[3] = ref)}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Enter Profile Info')}
          activeOpacity={0.7}
          style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
    paddingHorizontal: 24,
  },
  title: {
    color: 'rgba(15, 24, 40, 1)',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 16,
  },
  descriptionContainer: {
    width: 261,
    height: 48,
    marginTop: 8,
    marginBottom: 48,
  },
  description: {
    textAlign: 'center',
    color: '#0F1828',
    fontWeight: '400',
    fontSize: 14,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    flex: 1,
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 8,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'rgba(247, 247, 252, 1)',
  },
  resendButton: {
    width: 327,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 81,
    // backgroundColor: 'rgba(0, 45, 227, 0.1)',
    borderRadius: 8,
  },
  resendButtonText: {
    color: 'rgba(0, 45, 227, 1)',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnterOtp;
