import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
import {AuthContext} from '../providers/AuthProvider';
const TestScreen = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);
  // console.log(user);
  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate('BART');
        }}
        title="Balloon"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('SHARK');
        }}
        title="Shark"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('MemoryMatrix');
        }}
        title="Memory Matrix"
        style={styles.button}
      />

      <Button
        onPress={() => {
          navigation.navigate('KillTheSpider');
        }}
        title="Kill the Spider"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('Test');
        }}
        title="Test"
        style={styles.button}
      />
      <Button onPress={signout} title="signout" />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    margibottom: 10,
  },
});
export default TestScreen;
