import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {FormStyles} from '../styles/FormStyles';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Input} from './Input';
import {faEyeSlash, faUser, faAt} from '@fortawesome/free-solid-svg-icons';

export const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({});
  console.log(loginFormData);

  const handleChange = (text, fieldName) => {
    setLoginFormData({...loginFormData, [fieldName]: text});
  };

  return (
    <View style={{marginVertical: '5%'}}>
      <Input
        placeholder="E-mail"
        backgroundColor="#128C7E"
        color="#F7F6FB"
        placeholderTextColor="#F7F6FB"
        iconColor="#eae2b7"
        icon={faUser}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        placeholder="Password"
        backgroundColor="#128C7E"
        color="#F7F6FB"
        placeholderTextColor="#F7F6FB"
        icon={faEyeSlash}
        iconColor="#eae2b7"
        onChangeText={text => handleChange(text, 'password')}
      />
      <View
        style={[
          GlobalStyles.row,
          {marginVertical: '2%', justifyContent: 'space-between'},
        ]}>
        <View style={GlobalStyles.row}>
          <CheckBox
            tintColors={{true: '158c7e', false: '158c7e'}}
            tintColor="158c7e"
            onFillColor="158c7e"
            onTintColor="158c7e"
            onCheckColor="#fafaec"
            animationDuration={0.5}
            disabled={false}
            value={loginFormData.toggleCheckBox}
            onValueChange={newValue => handleChange(newValue, 'toggleCheckBox')}
          />
          <Text style={GlobalStyles.bodySmall}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={GlobalStyles.bodySmall}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
