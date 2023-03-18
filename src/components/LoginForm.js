import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Input} from './Input';
import {faEyeSlash, faUser} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../values/Colors';
import {FontStyle} from '../values/Font';

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
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        color={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        iconColor={COLORS.icon}
        icon={faUser}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        placeholder="Password"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        secureTextEntry={true}
        color={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        icon={faEyeSlash}
        iconColor={COLORS.icon}
        onChangeText={text => handleChange(text, 'password')}
      />
      <View
        style={[
          GlobalStyles.row,
          {marginVertical: '2%', justifyContent: 'space-between'},
        ]}>
        <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Text style={[FontStyle.small, {color: COLORS.textPrimary}]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
