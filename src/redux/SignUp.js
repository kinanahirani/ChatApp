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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

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
  const registerUser = async values => {
    
    const {email, password} = values;
    const userId = uuid.v4();

    firestore()
      .collection('users')
      .doc(userId)
      .set({
        email: email,
        password: password,
        userId: userId,
      })
      .then(() => {
        console.log('user created');
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleSignup = async values => {
    const {email, password} = values;
    try {
      // Create user with Firebase authentication
      await auth().createUserWithEmailAndPassword(email, password);
      await navigation.navigate('Contacts screen'); // Navigate to next screen after successful signup
    } catch (error) {
      console.log('Signup Error:', error);
      // Handle signup error here (e.g., show error message)
    }
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
          // justifyContent: 'center',
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
            onSubmit={val => registerUser(val)}
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
                  <Text style={{color: '#F7F7FC', fontSize: 16}}>Signup</Text>
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
