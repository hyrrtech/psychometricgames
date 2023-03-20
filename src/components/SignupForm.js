import {View} from 'react-native';
import React from 'react';
import {faUser, faAt} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../values/Colors';
import {Input} from './Input';

export const SignupForm = ({formData, setFormData}) => {
  const handleChange = (text, fieldName) => {
    setFormData({...formData, [fieldName]: text});
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
        value={formData.name}
        onChangeText={text => handleChange(text, 'name')}
      />
      <Input
        placeholder="E-mail"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        icon={faAt}
        iconColor={COLORS.icon}
        value={formData.email}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        placeholder="Password"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        iconColor={COLORS.icon}
        secureTextEntry={true}
        value={formData.password}
        onChangeText={text => handleChange(text, 'password')}
      />
    </View>
  );
};
