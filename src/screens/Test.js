import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Train} from '../components/Train of Thoughts/Train';

function getTotalDistance(path) {
  let totalDistance = 0;
  for (let i = 1; i < path.length; i++) {
    const startPoint = path[i - 1];
    const endPoint = path[i];
    const distance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2),
    );
    totalDistance += distance;
  }
  return totalDistance;
}
const PATH = [
  {x: 100, y: 100},
  {x: 100, y: 500},
  {x: 105, y: 518},
  {x: 125, y: 525},
  {x: 200, y: 525},
];

const Test = () => {
  const [trainCount, setTrainCount] = useState([0]);
  const [path, setPath] = useState(PATH);
  const totalDistance = getTotalDistance(path);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTrain = [...trainCount, trainCount.length];
      setTrainCount(newTrain);
      console.log('ran');
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [trainCount]);

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
      {trainCount.map((train, index) => (
        <Train key={index} path={path} totalDistance={totalDistance} />
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

export default Test;

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
