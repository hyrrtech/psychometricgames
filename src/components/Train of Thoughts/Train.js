import {useEffect, useState, useRef, useContext} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
const offsetX = 10;
const offsetY = 10;
const speed = 150;

export const Train = ({id}) => {
  const {setTrains, path, trains} = useContext(TrainOfThoughtsContext);
  const currentIndex = useRef(1);
  const trainPosition = useRef(
    new Animated.ValueXY({x: path[0].x - offsetX, y: path[0].y - offsetY}),
  ).current;
  const [trainPositionState, setTrainPositionState] = useState({
    x: path[0].x,
    y: path[0].y,
  });
  const getSegmentLength = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  };

  // function remove1stTrain(trains) {
  //   const newTrains = [...trains];
  //   console.log(newTrains, 'newTrains before splice');
  //   newTrains.splice(0, 1);
  //   console.log(newTrains, 'newTrains after splice');
  //   setTrains(newTrains);
  // }

  const moveTrain = PATH => {
    let index = currentIndex.current;

    if (index < PATH.length) {
      const segmentLength = getSegmentLength(PATH[index - 1], PATH[index]);
      const duration = segmentLength * (1000 / speed); // adjust speed as desired
      Animated.timing(trainPosition, {
        toValue: {x: PATH[index].x - offsetX, y: PATH[index].y - offsetY},
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && index < PATH.length - 1) {
          currentIndex.current = index + 1;
          moveTrain(PATH);
        }
      });
      setTrainPositionState({
        x: PATH[index].x,
        y: PATH[index].y,
      });
    }
  };

  useEffect(() => {
    moveTrain(path);
  }, [path]);

  return (
    <Animated.View
      style={[
        {
          left: 0,
          top: 0,
          height: 40,
          width: 40,
          borderWidth: 1,
          borderColor: 'black',
          position: 'absolute',
          backgroundColor: 'white',
        },
        trainPosition.getTranslateTransform(),
      ]}>
      <Text>{`x=${Math.floor(trainPositionState.x)} y=${Math.floor(
        trainPositionState.y,
      )}`}</Text>
    </Animated.View>
  );
};
