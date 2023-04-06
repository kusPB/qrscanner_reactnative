import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {getData, postData} from '../api/client';
import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';

const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 6)
      return updateError('Password is too short, must be bigger than 6 characters! ', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      try {
        console.log('1');
        postData('api/login', { ...userInfo })
        .then(result => {
          console.log(result.data);
          let data = result.data;
          if(data.state == 200){
            setUserInfo({ email: '', password: '' });
            setProfile(result.data);
            setIsLoggedIn(true);
          }else {
            updateError(data.msg, setError);
          }
        })
        .catch(error => {
          console.log(error);
          alert(error)
        });
        // console.log('6');
      } catch(error)  {
        console.log(error);
        updateError('Can\'t find server!', setError);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
