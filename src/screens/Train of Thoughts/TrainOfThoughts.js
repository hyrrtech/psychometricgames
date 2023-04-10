import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Train} from '../../components/Train of Thoughts/Train';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
const TrainOfThoughts = () => {
  const {trains, setPath, path} = useContext(TrainOfThoughtsContext);
  return (
    <View style={styles.container}>
      {path.map((point, index) => (
        <View
          key={index}
          style={[
            styles.path,
            {
              left: point.x,
              top: point.y,
            },
          ]}
        />
      ))}
      {trains.map((train, index) => (
        <Train key={train} id={index} />
      ))}
      <Button
        title="add path"
        onPress={() => {
          const newPath = [
            ...path,
            {
              x: Math.random() * Dimensions.get('window').width,
              y: Math.random() * Dimensions.get('window').height,
            },
          ];
          setPath(newPath);
        }}
      />
    </View>
  );
};

export default TrainOfThoughts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  path: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 5,
    height: 5,
  },
});
