import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
// import {Button} from '../components/Button';
import {AuthContext} from '../providers/AuthProvider';
const TestScreen = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);
  console.log(user);
  return (
    <View>
      <Text>{user.email}</Text>
      <Button title={'Signout'} onPress={signout} />
    </View>
  );
};
export default TestScreen;
