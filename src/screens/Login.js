import React, {useState} from 'react';
import {Button} from '../components/Button';
import {View, Text, ImageBackground} from 'react-native';
import {Wrapper} from '../components/Wrapper';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {LoginForm} from '../components/LoginForm';
import bg2 from '../assets/bg2.png';

const Login = ({navigation, route}) => {
  return (
    <BackgroundWrapper imageURL={bg2}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        style={GlobalStyles.mainContainer}>
        <Wrapper>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={GlobalStyles.subHeader}>Create New acount</Text>
          <LoginForm />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Login"
              style={{backgroundColor: '#075E54'}}
              color="#F7F6FB"
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default Login;
