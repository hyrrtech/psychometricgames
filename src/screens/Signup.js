import {Button} from '../components/Button';
import {View, Text} from 'react-native';
import {Wrapper} from '../components/Wrapper';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import {SignupForm} from '../components/SignupForm';
import google from '../assets/google.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import bg3 from '../assets/bg3.png';
const Signup = ({navigation, route}) => {
  return (
    <BackgroundWrapper imageURL={bg3}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={GlobalStyles.mainContainer}>
        <Wrapper>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={GlobalStyles.subHeader}>Create New acount</Text>
          <SignupForm />
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Sign up"
              style={{backgroundColor: '#075E54'}}
              color="#F7F6FB"
            />
            <Button
              icon={google}
              title="Sign up with google"
              style={{borderWidth: 1, borderColor: '#075E54'}}
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default Signup;
