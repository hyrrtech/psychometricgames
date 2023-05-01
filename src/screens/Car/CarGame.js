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
import ComponentGenerator from '../../utilities/ComponentGenerator';
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

const componentGenerator = new ComponentGenerator();

const CarGame = () => {
  const [roadLines, setRoadLines] = useState([0]);
  const [objects, setObjects] = useState(new Set());

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

  const destoryObject = (id) => {
    componentGenerator.destroy(id)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const uuid = componentGenerator.generateNew(<AnimatedDrop
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
      </AnimatedDrop>);
      setObjects(prev => new Set(prev).add(uuid));
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  const renderObjects = () => {
    const components = [];
    for (var it = objects.values(), val= null; val=it.next().value; ) {
      components.push(componentGenerator.get(val));
    }
    return components;
  }

  return (
    <View style={styles.background}>
      <Sky skyHeight={SKY_HEIGHT} />
      <Road
        roadHeight={ROAD_HEIGHT}
        roadWidth={ROAD_WIDTH}
        roadLineWidth={ROAD_LINE_WIDTH}>
        
        {renderObjects()}

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
