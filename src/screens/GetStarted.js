import {Button} from '../components/Button';
import {View, Text} from 'react-native';
import {Wrapper} from '../components/Wrapper';
import {GlobalStyles} from '../styles/GlobalStyles';
import {Logo} from '../components/Logo';
import Constants from '../constants/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {BackgroundWrapper} from '../components/BackgroundWrapper';
import bg1 from '../assets/bg1.png';
const GetStarted = ({navigation, route}) => {
  return (
    <BackgroundWrapper imageURL={bg1}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={GlobalStyles.mainContainer}>
        <Wrapper>
          <View style={{marginVertical: '10%'}}>
            <Logo />
          </View>
          <Text style={GlobalStyles.header}>{Constants.title}</Text>
          <Text style={GlobalStyles.subHeader}>{Constants.description}</Text>

          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Sign up"
              style={{backgroundColor: '#075E54'}}
              color="#F7F6FB"
              onPress={() => navigation.navigate('Signup')}
            />
            <Button
              title="Log in"
              style={{borderWidth: 1, borderColor: '#075E54'}}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default GetStarted;
