import {useEffect, useState, useRef, useContext} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
const offsetX = 25;
const offsetY = 25;
const speed = 150;

export const Train = ({id}) => {
  const {setTrains, path, trains} = useContext(TrainOfThoughtsContext);
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
    return Math.sqrt(dx * dx + dy * dy);
  };
  console.log(path, id, 'outside');
  // function remove1stTrain(trains) {
  //   console.log(trains, 'trains');
  //   const newTrains = [...trains];
  //   console.log(newTrains, 'newTrains before splice');
  //   newTrains.splice(0, 1);
  //   console.log(newTrains, 'newTrains after splice');
  //   setTrains(newTrains);
  // }
  const getPathFromOutside = () => {
    return [...path];
  };
  const moveTrain = (index, PATH) => {
    console.log(PATH, id, 'inside');
    const segmentLength = getSegmentLength(PATH[index - 1], PATH[index]);
    const duration = segmentLength * (1000 / speed); // adjust speed as desired
    Animated.timing(trainPosition, {
      toValue: {x: PATH[index].x - offsetX, y: PATH[index].y - offsetY},
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      // if (finished && index === PATH.length - 1) {
      //   remove1stTrain(trains);
      // }
      if (finished && index < PATH.length - 1) {
        moveTrain(index + 1, getPathFromOutside());
        setTrainPositionState({
          x: PATH[index].x,
          y: PATH[index].y,
        });
      }
    });
  };

  useEffect(() => {
    moveTrain(1, path);
  }, []);

  return (
    <Animated.View
      style={[
        {
          left: 0,
          top: 0,
          height: 50,
          width: 50,
          backgroundColor: 'rgba(0,0,0,0.1)',
          position: 'absolute',
        },
        trainPosition.getTranslateTransform(),
      ]}>
      <Text>{`x=${Math.floor(trainPositionState.x)} y=${Math.floor(
        trainPositionState.y,
      )}`}</Text>
    </Animated.View>
  );
};
