import React, {useState, useContext} from 'react';
import {Button} from '../components/Button';
import {View, Text, Alert} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {LoginForm} from '../components/LoginForm';
import {COLORS} from '../values/Colors';
import {FontStyle} from '../values/Font';
import google from '../assets/google.png';
import {AuthContext} from '../providers/AuthProvider';
import BackgroundImage from '../values/BackgroundImage';

const Login = ({navigation, route}) => {
  const [formData, setFormData] = useState({});
  const {login, signin_with_google} = useContext(AuthContext);
  const [loading, setLoading] = useState({login: false, google: false});

  const handleLogin = () => {
    //validation check to be done
    setLoading({...loading, login: true});
    login(formData.email, formData.password)
      .then(() => setLoading({...loading, login: false}))
      .catch(error => {
        setLoading({...loading, login: false});
        Alert.alert('demo error alert', error.message, [{text: 'OK'}]);
      });
  };
  const handleLoginWithGoogle = () => {
    setLoading({...loading, google: true});
    signin_with_google()
      .then(() => setLoading({...loading, google: false}))
      .catch(error => {
        setLoading({...loading, google: false});
        Alert.alert('demo error alert', error.message, [{text: 'OK'}]);
      });
  };
  return (
    <BackgroundWrapper imageURL={BackgroundImage.login}>
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
          <LoginForm formData={formData} setFormData={setFormData} />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              onPressIn={handleLogin}
              title={loading.login ? 'Loading...' : 'Login'}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.textSecondary,
              }}
            />
            <Button
              onPressIn={handleLoginWithGoogle}
              icon={!loading.google && google}
              title={loading.google ? 'Loading...' : 'Log in with google'}
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default Login;
