import React, {useState} from 'react';
import {Button} from '../components/Button';
import {View, Text} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {LoginForm} from '../components/LoginForm';
import bg2 from '../assets/bg2.png';
import {COLORS} from '../values/Colors';
import {FontStyle} from '../values/Font';
import google from '../assets/google.png';

const Login = ({navigation, route}) => {
  return (
    <BackgroundWrapper imageURL={bg2}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.wrapper}>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={[FontStyle.h3, {color: COLORS.textPrimary}]}>
            Create New acount
          </Text>
          <LoginForm />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Login"
              style={{backgroundColor: COLORS.primary, borderRadius: 10}}
              color={COLORS.textSecondary}
            />
            <Button
              icon={google}
              title="Log in with google"
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
              }}
              color={COLORS.primary}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default Login;
