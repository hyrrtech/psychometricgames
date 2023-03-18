import {Button} from '../components/Button';
import {View, Text} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {SignupForm} from '../components/SignupForm';
import google from '../assets/google.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import bg3 from '../assets/bg3.png';
import {FontStyle} from '../values/Font';
import {COLORS} from '../values/Colors';

const Signup = ({navigation, route}) => {
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
          <SignupForm />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Sign up"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.textSecondary,
              }}
            />
            <Button
              icon={google}
              title="Sign up with google"
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
