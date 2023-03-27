import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from '../components/Button';
import {AuthContext} from '../providers/AuthProvider';
const TestScreen = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);
  // console.log(user);
  return (
    <View>
      <Text>{user.displayName}</Text>
      <Button
        onPress={() => {
          navigation.navigate('BART');
        }}
        title="Balloon"
      />
      <Button onPress={signout} title="signout" />
    </View>
  );
};
export default TestScreen;
