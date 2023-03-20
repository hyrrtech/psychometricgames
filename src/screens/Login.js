import React, {useState, useContext} from 'react';
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
import {AuthContext} from '../providers/AuthProvider';

const Login = ({navigation, route}) => {
  const [formData, setFormData] = useState({});
  const {login, signin_with_google} = useContext(AuthContext);

  const handleLogin = () => {
    login(formData.email, formData.password);
  };
  const handleLoginWithGoogle = () => {
    signin_with_google();
  };
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
          <LoginForm formData={formData} setFormData={setFormData} />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              onPressIn={handleLogin}
              title="Login"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.textSecondary,
              }}
            />
            <Button
              onPressIn={handleLoginWithGoogle}
              icon={google}
              title="Log in with google"
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
