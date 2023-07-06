// import React, {useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const Login = ({navigation}) => {

//   const handleLogin = async (values) => {
//     const { email, password } = values;

//     try {
//       const { user } = await auth().signInWithEmailAndPassword(email, password);

//       if (user) {
//         const userDoc = await firestore()
//           .collection('users')
//           .doc(user.uid)
//           .get();

//         if (userDoc.exists) {
//           const userData = userDoc.data();
//           goToNext(userData.email, userData.password, userData.userId);
//         } else {
//           Alert.alert('User not found!');
//         }
//       }
//       else{
//         Alert.alert('Wrong credentials!');
//       }
//     } catch (error) {
//       Alert.alert('Login Error:', error);
//     }
//   };

//   const goToNext = async (email, password, userId) => {
//     // let authData = { email,password,userId};
//     // await AsyncStorage.setItem('userData', JSON.stringify(authData));
//     await AsyncStorage.setItem('EMAIL', email);
//     await AsyncStorage.setItem('PASSWORD', password);
//     await AsyncStorage.setItem('USER_ID', userId);
//     navigation.navigate('Bottom Tab');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         activeOpacity={0.5}
//         style={{marginTop: 20, marginLeft: 24}}>
//         <Image source={require('../images/back-icon.png')} />
//       </TouchableOpacity>
//       <View
//         style={{
//           alignItems: 'center',
//           marginTop: 140,
//         }}>
//         <View
//           style={{
//             width: '83%',
//           }}>
//           <Text
//             style={{
//               color: 'rgba(15, 24, 40, 1)',
//               fontWeight: '700',
//               fontSize: 24,
//               marginBottom: 8,
//               textAlign: 'center',
//             }}>
//             Login
//           </Text>
//           <Text
//             style={{
//               marginBottom: 15,
//               color: 'rgba(15, 24, 40, 1)',
//               fontWeight: '400',
//               fontSize: 14,
//             }}>
//             Please enter your email and password to start chat
//           </Text>
//           <Formik
//             initialValues={{email: '', password: ''}}
//             onSubmit={values => handleLogin(values)}
//             validationSchema={validationSchema}>
//             {({
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               values,
//               errors,
//               touched,
//             }) => (
//               <View>
//                 <TextInput
//                   placeholder="Email"
//                   style={styles.input}
//                   onChangeText={handleChange('email')}
//                   onBlur={handleBlur('email')}
//                   value={values.email}
//                 />
//                 {errors.email && touched.email && (
//                   <Text style={styles.errorText}>{errors.email}</Text>
//                 )}
//                 <TextInput
//                   placeholder="Password"
//                   secureTextEntry={true}
//                   style={styles.input}
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                 />
//                 {errors.password && touched.password && (
//                   <Text style={styles.errorText}>{errors.password}</Text>
//                 )}
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={handleSubmit}
//                   style={styles.button}>
//                   <Text style={{color: '#F7F7FC', fontSize: 16}}>Login</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </Formik>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 10,
//             }}>
//             <Text>Don't have an account?</Text>
//             <TouchableOpacity
//               style={{marginLeft: 4}}
//               onPress={() => navigation.navigate('Signup')}>
//               <Text style={{color: '#002DE3'}}>SIGN UP</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     flex: 1,
//   },
//   input: {
//     marginTop: 10,
//     backgroundColor: 'rgba(247, 247, 252, 1)',
//     // borderColor:'rgba(0, 45, 227, 1)',
//     // borderWidth:0.6,
//     elevation: 3,
//     marginBottom: 5,
//   },
//   errorText: {
//     marginTop: 4,
//     color: 'red',
//   },
//   button: {
//     width: '100%',
//     height: 52,
//     backgroundColor: '#002DE3',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//   },
// });

import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = ({navigation}) => {
  const [token, setToken] = useState('');

  async function getToken() {
    let token = await messaging().getToken();
    setToken(token);
  }
  useEffect(() => {
    getToken();
  }, []);

  const handleLogin = async (values, {setSubmitting}) => {
    Keyboard.dismiss();
    const {email, password} = values;

    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);

      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get()
            if (userDoc.exists) {
              const userData = userDoc.data();
              const updatedUserDoc = await firestore().collection('users').doc(user.uid).update({ token: token });
              goToNext(userData.email, userData.password, userData.userId);
            } else {
              Alert.alert('User not found!');
            }
          // })

        // if (userDoc.exists) {
        //   const userData = userDoc.data();
        //   goToNext(userData.email, userData.password, userData.userId);
        // } else {
        //   Alert.alert('User not found!');
        // }
      } else {
        Alert.alert('Wrong credentials!');
      }
    } catch (error) {
      Alert.alert('Login Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToNext = async (email, password, userId) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('PASSWORD', password);
    await AsyncStorage.setItem('USER_ID', userId);
    navigation.navigate('Bottom Tab');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.5}
        style={{marginTop: 20, marginLeft: 24}}>
        <Image source={require('../images/back-icon.png')} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: 140}}>
        <View style={{width: '83%'}}>
          <Text
            style={{
              color: 'rgba(15, 24, 40, 1)',
              fontWeight: '700',
              fontSize: 24,
              marginBottom: 8,
              textAlign: 'center',
            }}>
            Login
          </Text>
          <Text
            style={{
              marginBottom: 15,
              color: 'rgba(15, 24, 40, 1)',
              fontWeight: '400',
              fontSize: 14,
            }}>
            Please enter your email and password to start chat
          </Text>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  returnKeyType="next"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={isSubmitting}>
                  <Text style={{color: '#F7F7FC', fontSize: 16}}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              style={{marginLeft: 4}}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: '#002DE3'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  input: {
    marginTop: 10,
    backgroundColor: 'rgba(247, 247, 252, 1)',
    elevation: 3,
    color:'black',
    marginBottom: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  errorText: {
    marginTop: 4,
    color: 'red',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#002DE3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
