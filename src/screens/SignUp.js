import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(
      /^([a-zA-Z0-9]+)([\-\_\.]*)([a-zA-Z0-9]*)([@])([a-zA-Z0-9]{2,})([\.][a-zA-Z]{2,3})$/,
      'Please enter valid email.',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/,
      'Must contain 1 uppercase, 1 lowercase, 1 special character and 1 digit character.',
    )
    .required('Password is required'),
});

const Signup = ({navigation}) => {
  // const registerUser = (values) => {

  //   const {email, password} = values;
  //   const userId = uuid.v4();
  //   firestore()
  //     .collection('users')
  //     .doc(userId)
  //     .set({
  //       email: email,
  //       password: password,
  //       userId: userId,
  //     })
  //     .then(() => {
  //       console.log('user created');
  //       navigation.navigate('Enter Profile Info')
  //     })
  //     .catch(error => {
  //       console.log('Error:', error);
  //     });
  // };

  const registerUser = async values => {
    const {email, password} = values;

    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (user) {
        const userId = user.uid;

        await firestore().collection('users').doc(userId).set({
          email: email,
          userId: userId,
          password: password,
        });
        goToNext(email, password, userId);
        console.log('User created');
        navigation.navigate('Enter Profile Info');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const goToNext = async (email, password, userId) => {
    // let authData = { email,password,userId};
    // await AsyncStorage.setItem('userData', JSON.stringify(authData));
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('PASSWORD', password);
    await AsyncStorage.setItem('USER_ID', userId);
    navigation.navigate('Enter Profile Info');
  };

  return (
    <View style={styles.container}>
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
            Create Your Account!
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
            onSubmit={values => registerUser(values)}
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
                  onChangeText={handleChange('email')}
                  returnKeyType='next'
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
                  returnKeyType='next'
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
                    {isSubmitting ? 'Signup...' : 'Signup'}
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
            <Text>Already a user?</Text>
            <TouchableOpacity
              style={{marginLeft: 4}}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#002DE3'}}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
