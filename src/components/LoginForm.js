import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Input} from './Input';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../values/Colors';
import {FontStyle} from '../values/Font';

export const LoginForm = ({formData, setFormData}) => {
  const handleChange = (text, fieldName) => {
    setFormData({...formData, [fieldName]: text});
  };

  return (
    <View style={{marginVertical: '5%'}}>
      <Input
        value={formData.email}
        placeholder="E-mail"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
        iconColor={COLORS.icon}
        icon={faUser}
        onChangeText={text => handleChange(text, 'email')}
      />
      <Input
        value={formData.password}
        placeholder="Password"
        style={{borderRadius: 9, backgroundColor: COLORS.secondary}}
        secureTextEntry={true}
        textColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
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
