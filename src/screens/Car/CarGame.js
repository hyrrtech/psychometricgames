import React, {useEffect, useState, useContext} from 'react';
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
import {CarGameContext} from '../../providers/CarGame.Provider';
import {
  constants,
  generateRandomObstaclePosition,
} from '../../utilities/CarGame';

const {
  carCenterXPosition,
  carYPosition,
  carLeftXPosition,
  carRightXPosition,
  CAR_WIDTH,
  CAR_HEIGHT,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  ROAD_HEIGHT,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_WIDTH,
  ROAD_WIDTH,
  SKY_HEIGHT,
} = constants;

const obstacleGenerator = new ComponentGenerator();
const roadLineGenerator = new ComponentGenerator();

const CarGame = () => {
  const {carPosition, setCarPosition, carPositionRef} =
    useContext(CarGameContext);
  const [roadLines, setRoadLines] = useState(new Set());
  const [objects, setObjects] = useState(new Set());

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
        duration: 150,
        useNativeDriver: true,
      }).start(() => setCarPosition(newPosition));
    }
  };

  const destroyLine = id => {
    roadLineGenerator.destroy(id);
  };
  const destoryObject = id => {
    obstacleGenerator.destroy(id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const obstacle_uuid = obstacleGenerator.generateNew(
        <AnimatedDrop
          objectType={'obstacle'}
          duration={3200}
          objectHeight={OBSTACLE_HEIGHT}
          lanePosition={generateRandomObstaclePosition()}
          destroy={destoryObject}>
          <Obstacle
            positionHorizontal={'left'}
            obstacleHeight={OBSTACLE_HEIGHT}
            obstacleWidth={OBSTACLE_WIDTH}
          />
        </AnimatedDrop>,
      );
      const roadLine_uuid = roadLineGenerator.generateNew(
        <AnimatedDrop
          objectType={'roadLine'}
          duration={3200}
          objectHeight={ROAD_LINE_HEIGHT}
          destroy={destroyLine}>
          <RoadLine
            roadLineHeight={ROAD_LINE_HEIGHT}
            roadLineWidth={ROAD_LINE_WIDTH}
          />
        </AnimatedDrop>,
      );
      setRoadLines(prev => new Set(prev).add(roadLine_uuid));
      setObjects(prev => new Set(prev).add(obstacle_uuid));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderObjects = () => {
    const components = [];
    for (var it = objects.values(), val = null; (val = it.next().value); ) {
      components.push(obstacleGenerator.get(val));
    }
    return components;
  };

  const renderLines = () => {
    const components = [];
    for (var it = roadLines.values(), val = null; (val = it.next().value); ) {
      components.push(roadLineGenerator.get(val));
    }
    return components;
  };

  return (
    <View style={styles.background}>
      <Sky skyHeight={SKY_HEIGHT} />
      <Road
        roadHeight={ROAD_HEIGHT}
        roadWidth={ROAD_WIDTH}
        roadLineWidth={ROAD_LINE_WIDTH}>
        {renderLines()}
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
            height: 50,
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
            height: 50,
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
