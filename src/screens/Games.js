import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
const Games = ({navigation}) => {
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

      {/* <Button
        onPress={() => {
          navigation.navigate('KillTheSpider');
        }}
        title="Kill the Spider"
        style={styles.button}
      /> */}
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
          navigation.navigate('FishGame');
        }}
        title="Fish Game"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('PiratePassage');
        }}
        title="Pirate Passage"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('FuseWire');
        }}
        title="Fuse Wire"
        style={styles.button}
      />

      <Button
        onPress={() => {
          navigation.navigate('FrogJump');
        }}
        title="Frog Jump"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('OrganicOrder');
        }}
        title="OrganicOrder"
        style={styles.button}
      />
      <Button
        onPress={() => {
          navigation.navigate('Masterpiece');
        }}
        title="Masterpiece"
        style={styles.button}
      />
      <Button
        onPress={() => {
          console.log('Star Search');
          navigation.navigate('StarSearch');
        }}
        title="Star Search"
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
    color: 'black',
  },
});
export default Games;
