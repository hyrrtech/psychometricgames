import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
import {AuthContext} from '../providers/AuthProvider';
const Home = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);
  return (
    <View>
      <Button onPress={signout} title="signout" />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    marginVertical: 15,
    marginHorizontal: 15,
    color: 'black',
  },
});
export default Home;
