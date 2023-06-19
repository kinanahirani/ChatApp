import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = ({navigation}) => {
  // const handleLogin = async values => {
  //   const {email, password} = values;

  //   firestore()
  //     .collection('users')
  //     .where('email', '==', email)
  //     .get()
  //     .then(res => {
  //       if (!res.empty) {
  //         console.log(JSON.stringify(res.docs[0].data()));
  //         goToNext(res.docs[0].data().email, res.docs[0].data().password, res.docs[0].data().userId);
  //       } else Alert.alert('User not found!');
  //     })
  //     .catch(err => {
  //       console.log('Login error: ', err);
  //     });
  //   // try {
  //   //   // Authenticate user with Firebase authentication
  //   //   await auth().signInWithEmailAndPassword(email, password);
  //   //   await navigation.navigate('Contacts screen');
  //   // } catch (error) {
  //   //   console.log('Login Error:', error);
  //   //   // Handle login error here (e.g., show error message)
  //   // }
  // };

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          goToNext(userData.email, userData.password, userData.userId);
        } else {
          Alert.alert('User not found!');
        }
      }
    } catch (error) {
      console.log('Login Error:', error);
    }
  };

  const goToNext = async (email, password, userId) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('PASSWORD', password);
    await AsyncStorage.setItem('USER_ID', userId);
    navigation.navigate('Bottom Tab');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.5}
        style={{marginTop: 20, marginLeft: 24}}>
        <Image source={require('../images/back-icon.png')} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          marginTop: 140,
        }}>
        <View
          style={{
            width: '83%',
          }}>
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
            onSubmit={values => handleLogin(values)}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
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
                  style={styles.button}>
                  <Text style={{color: '#F7F7FC', fontSize: 16}}>Login</Text>
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
    </KeyboardAvoidingView>
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
    marginBottom: 5,
    // Add your input field styles here
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
    // marginHorizontal: 24,
  },
});
