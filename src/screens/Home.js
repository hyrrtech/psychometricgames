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
          navigation.navigate('CarGame');
        }}
        title="Car Game"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('TrainOfThoughts');
        }}
        title="TrainOfThoughts"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('ColorMatch');
        }}
        title="Color Match"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('Fish');
        }}
        title="Fish"
        style={styles.button}
      />

      <Button
        onPress={() => {
          navigation.navigate('Frog Jump');
        }}
        title="Frog Jump"
        style={styles.button}
      />

      <Button onPress={signout} title="signout" />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    marginVertical: 15,
    marginHorizontal: 15,
  },
});
export default TestScreen;