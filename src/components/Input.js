import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FontStyle} from '../values/Font';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

export const Input = props => {
  const {icon, iconColor, style, textColor, secureTextEntry, ...restProps} =
    props;
  const [secureText, setSecureText] = useState(secureTextEntry);

  return (
    <View style={[styles.input, style]}>
      {!secureTextEntry && icon ? (
        <FontAwesomeIcon
          icon={icon}
          size={20}
          style={{marginRight: '2%', color: iconColor}}
        />
      ) : null}
      {secureTextEntry ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSecureText(!secureText)}>
          <FontAwesomeIcon
            icon={secureText ? faEyeSlash : faEye}
            size={20}
            style={{marginRight: '2%', color: iconColor}}
          />
        </TouchableOpacity>
      ) : null}
      <TextInput
        style={[
          FontStyle.p,
          {
            color: textColor,
            width: '100%',
          },
        ]}
        secureTextEntry={secureText}
        selectionColor={'rgba(255, 255, 255, 0.5)'}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
    paddingHorizontal: '5%',
    paddingVertical: '1.2%',
    overflow: 'hidden',
  },
});
