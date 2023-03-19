import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {faUser, faAt} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../values/Colors';
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
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        color={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        iconColor={COLORS.icon}
        icon={faUser}
        value={signUpFormData.name}
        onChangeText={text => handleChange(text, 'name')}
      />
      <Input
        placeholder="E-mail"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        icon={faAt}
        iconColor={COLORS.icon}
        value={signUpFormData.email}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        placeholder="Password"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        iconColor={COLORS.icon}
        secureTextEntry={true}
        value={signUpFormData.password}
        onChangeText={text => handleChange(text, 'password')}
      />
    </View>
  );
};
