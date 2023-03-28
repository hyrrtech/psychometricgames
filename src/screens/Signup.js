import React, {useState, useContext} from 'react';
import {Button} from '../components/Button';
import {View, Text, Alert} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {SignupForm} from '../components/SignupForm';
import google from '../assets/google.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import bg3 from '../assets/bg3.png';
import {FontStyle} from '../values/Font';
import {COLORS} from '../values/Colors';
import {AuthContext} from '../providers/AuthProvider';

const Signup = ({navigation, route}) => {
  const [formData, setFormData] = useState({});
  const {signup, signin_with_google} = useContext(AuthContext);
  const [loading, setLoading] = useState({signup: false, google: false});

  const handleSignup = () => {
    //validation check to be done
    setLoading({...loading, signup: true});
    signup(formData.name, formData.email, formData.password)
      .then(() => setLoading({...loading, signup: false}))
      .catch(error => {
        setLoading({...loading, signup: false});
        Alert.alert('demo error alert', error.message, [{text: 'OK'}]);
      });
  };
  const handleSignupWithGoogle = () => {
    setLoading({...loading, google: true});
    signin_with_google()
      .then(() => setLoading({...loading, google: false}))
      .catch(error => {
        setLoading({...loading, google: false});
        Alert.alert('demo error alert', error.message, [{text: 'OK'}]);
      });
  };
  return (
    <BackgroundWrapper imageURL={bg3}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.wrapper}>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={[FontStyle.h3, {color: COLORS.textPrimary}]}>
            Create New acount
          </Text>
          <SignupForm formData={formData} setFormData={setFormData} />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              onPressIn={handleSignup}
              title={loading.signup ? 'Loading...' : 'Sign up'}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.textSecondary,
              }}
            />
            <Button
              onPressIn={handleSignupWithGoogle}
              icon={!loading.google && google}
              title={loading.google ? 'Loading...' : 'Sign up with google'}
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

export default Signup;
