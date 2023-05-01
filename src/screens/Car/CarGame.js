import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Sky from '../../components/Car Game/Sky';
import Road from '../../components/Car Game/Road';
import RoadLine from '../../components/Car Game/RoadLine';
import Obstacle from '../../components/Car Game/Object';
import AnimatedDrop from '../../components/Helper';
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const SKY_HEIGHT = WINDOW_HEIGHT * 0.25;
const ROAD_HEIGHT = WINDOW_HEIGHT * 2.42;
const ROAD_WIDTH = WINDOW_WIDTH * 0.3;
const ROAD_LINE_HEIGHT = WINDOW_HEIGHT * 0.55;
const ROAD_LINE_WIDTH = ROAD_WIDTH * 0.05;

const OBSTACLE_HEIGHT = WINDOW_HEIGHT * 0.2;
const OBSTACLE_WIDTH = WINDOW_WIDTH * 0.07;

const CAR_HEIGHT = WINDOW_HEIGHT * 0.2;
const CAR_WIDTH = ROAD_WIDTH * 0.24;

//car positions
const carCenterXPosition = ROAD_WIDTH / 2 - CAR_WIDTH + ROAD_LINE_WIDTH;
const carLeftXPosition = ROAD_LINE_WIDTH / 5;
const carRightXPosition = ROAD_WIDTH - CAR_WIDTH - 3 * ROAD_LINE_WIDTH;
const carYPosition = ROAD_HEIGHT - OBSTACLE_HEIGHT;

const CarGame = () => {
  const [roadLines, setRoadLines] = useState([0]);
  const [objects, setObjects] = useState([0]);

  const [carPosition, setCarPoisiton] = useState('center');

  const carPositionRef = useRef(
    new Animated.ValueXY({
      x: carCenterXPosition,
      y: carYPosition,
    }),
  ).current;

  const handlPress = to => {
    const translateX = (carPosition, to) => {
      if (carPosition === 'center' && to === 'left')
        return {translateValue: carLeftXPosition, newPosition: 'left'};

      if (carPosition === 'center' && to === 'right')
        return {translateValue: carRightXPosition, newPosition: 'right'};

      if (carPosition === 'left' && to === 'right')
        return {translateValue: carCenterXPosition, newPosition: 'center'};

      if (carPosition === 'right' && to === 'left')
        return {translateValue: carCenterXPosition, newPosition: 'center'};
    };

    if (carPosition !== to) {
      const {translateValue, newPosition} = translateX(carPosition, to);
      Animated.timing(carPositionRef, {
        toValue: {
          x: translateValue,
          y: carYPosition,
        },
        duration: 200,
        useNativeDriver: true,
      }).start(() => setCarPoisiton(newPosition));
    }
  };

  const destoryLine = () => {
    setRoadLines(prevRoadLines => {
      if (prevRoadLines.length > 1) {
        const newRoadLines = [...prevRoadLines];
        newRoadLines.shift();
        return newRoadLines;
      }
      return prevRoadLines;
    });
  };

  const destoryObject = () => {
    setObjects(prevObjects => {
      if (prevObjects.length > 1) {
        const newObjects = [...prevObjects];
        newObjects.shift();
        return newObjects;
      }
      return prevObjects;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setObjects(objects => [...objects, objects[objects.length - 1] + 1]);
      setRoadLines(roadLines => [
        ...roadLines,
        roadLines[roadLines.length - 1] + 1,
      ]);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.background}>
      <Sky skyHeight={SKY_HEIGHT} />
      <Road
        roadHeight={ROAD_HEIGHT}
        roadWidth={ROAD_WIDTH}
        roadLineWidth={ROAD_LINE_WIDTH}>
        {/* {roadLines.map(roadLine => (
          <AnimatedDrop
            key={roadLine}
            id={roadLine}
            currentCarPosition={carPositionRef.__getValue()}
            roadHeight={ROAD_HEIGHT}
            duration={2000}
            objectHeight={ROAD_LINE_HEIGHT}
            destroy={destoryLine}>
            <RoadLine
              roadLineHeight={ROAD_LINE_HEIGHT}
              roadLineWidth={ROAD_LINE_WIDTH}
            />
          </AnimatedDrop>
        ))} */}
        {objects.map(object => (
          <AnimatedDrop
            key={object}
            id={object}
            currentCarPosition={carPositionRef.__getValue()}
            roadHeight={ROAD_HEIGHT}
            duration={2000}
            objectHeight={OBSTACLE_HEIGHT}
            destroy={destoryObject}>
            <Obstacle
              positionHorizontal={'right'}
              obstacleHeight={OBSTACLE_HEIGHT}
              obstacleWidth={OBSTACLE_WIDTH}
            />
          </AnimatedDrop>
        ))}

        <Animated.View
          style={[
            {
              position: 'absolute',
              height: CAR_HEIGHT,
              transform: [
                {translateX: carPositionRef.x},
                {translateY: carPositionRef.y},
              ],
              width: CAR_WIDTH,
              backgroundColor: 'red',
            },
            carPositionRef.getTranslateTransform(),
          ]}
        />
      </Road>

      {/* buttons */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => handlPress('left')}
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            height: WINDOW_HEIGHT * 0.05,
            backgroundColor: 'white',
          }}>
          <Text>LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlPress('right')}
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            height: WINDOW_HEIGHT * 0.05,
            backgroundColor: 'white',
          }}>
          <Text>RIGHT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#dabe53',
    alignItems: 'center',
  },
});

export default CarGame;
