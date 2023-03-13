import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {faEyeSlash, faUser, faAt} from '@fortawesome/free-solid-svg-icons';
import {Input} from './Input';

export const SignupForm = () => {
  const [signUpFormData, setSignUpFormData] = useState({});

  const handleChange = (text, fieldName) => {
    setSignUpFormData({...signUpFormData, [fieldName]: text});
  };
  return (
    <View style={{marginVertical: '5%'}}>
      <Input
        placeholder="Name"
        backgroundColor="#128C7E"
        color="#F7F6FB"
        placeholderTextColor="#F7F6FB"
        iconColor="#eae2b7"
        icon={faUser}
        value={signUpFormData.name}
        onChangeText={text => handleChange(text, 'name')}
      />
      <Input
        placeholder="E-mail"
        backgroundColor="#128C7E"
        color="#F7F6FB"
        placeholderTextColor="#F7F6FB"
        icon={faAt}
        iconColor="#eae2b7"
        value={signUpFormData.email}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        placeholder="Password"
        backgroundColor="#128C7E"
        color="#F7F6FB"
        placeholderTextColor="#F7F6FB"
        icon={faEyeSlash}
        iconColor="#eae2b7"
        value={signUpFormData.password}
        onChangeText={text => handleChange(text, 'password')}
      />
    </View>
  );
};
