import {Button} from '../components/Button';
import {View, Text} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import Constants from '../constants/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import bg1 from '../assets/bg1.png';
import {FontStyle} from '../values/Font';
import {COLORS} from '../values/Colors';
const OnBoarding = ({navigation, route}) => {
  return (
    <BackgroundWrapper imageURL={bg1}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.wrapper}>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={[FontStyle.h1, {color: COLORS.textPrimary}]}>
            {Constants.title}
          </Text>
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Sign up"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.textSecondary,
              }}
              onPress={() => navigation.navigate('Signup')}
            />
            <Button
              title="Log in"
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: '5%',
                color: COLORS.primary,
              }}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default OnBoarding;
