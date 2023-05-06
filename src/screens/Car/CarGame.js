import React, {useEffect, useState, useContext, useRef, useCallback} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import Sky from '../../components/Car Game/Sky';
import Road from '../../components/Car Game/Road';
import RoadLine from '../../components/Car Game/RoadLine';
import Obstacle from '../../components/Car Game/Object';
import AnimatedDrop from '../../components/AnimatedDrop';
import ComponentGenerator from '../../utilities/ComponentGenerator';
import {CarGameContext} from '../../providers/CarGame.Provider';
import {
  constants,
  generateRandomObstaclePosition,
  getNewCarPosition,
} from '../../utilities/CarGame';

import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import {useCountdown} from '../../utilities';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';

const {
  carYPosition,
  CAR_WIDTH,
  CAR_HEIGHT,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  ROAD_HEIGHT,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_WIDTH,
  ROAD_WIDTH,
  SKY_HEIGHT,
  SPAWN_INTERVAL,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  DISTANCE_BETWEEN_LINES
} = constants;

const obstacleGenerator = new ComponentGenerator();
const roadLineGenerator = new ComponentGenerator();

const CarGame = () => {
  const {carPosition, setCarPosition, invincibleAnimation, carPositionRef, speed} =
    useContext(CarGameContext);
  const [roadLines, setRoadLines] = useState(new Set());
  const [objects, setObjects] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [completedPopup, setCompletedPopup] = useState(false);
  const {TIME} = useCountdown(2, 0);

  const opacity = invincibleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const getSpawnDuration = useCallback(()=>{
    // console.log(speed);
    const duration = 2000*(DISTANCE_BETWEEN_LINES/speed);
    // console.log(duration);
    return duration;
  },[speed]);

  const handlPress = to => {
    if (carPosition !== to) {
      const {translateValue, newPosition} = getNewCarPosition(carPosition, to);
      Animated.timing(carPositionRef, {
        toValue: {
          x: translateValue,
          y: carYPosition,
        },
        duration: 100,
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
      const roadLine_uuid = roadLineGenerator.generateNew(
        <AnimatedDrop
          objectType={'roadLine'}
          objectHeight={ROAD_LINE_HEIGHT}
          destroy={destroyLine}>
          <RoadLine
            roadLineHeight={ROAD_LINE_HEIGHT}
            roadLineWidth={ROAD_LINE_WIDTH}
          />
        </AnimatedDrop>,
      );
      setRoadLines(prev => new Set(prev).add(roadLine_uuid));
    }, getSpawnDuration() * 0.8);
    return () => clearInterval(interval);
  }, [getSpawnDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      const obstacle_uuid = obstacleGenerator.generateNew(
        <AnimatedDrop
          objectType={'obstacle'}
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
      setObjects(prev => new Set(prev).add(obstacle_uuid));
    }, getSpawnDuration() * 0.9);
    return () => clearInterval(interval);
  }, [getSpawnDuration]);

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

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.KillTheSpider}
      backgroundGradient={COLORS.killTheSpiderBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Time'}
          value={TIME}
          style={styles.infoLabel}
          key="time"
        />,
      ]}>
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
                opacity: opacity,
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
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: WINDOW_HEIGHT * 0.75,
            flexDirection: 'row',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => handlPress('left')}
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              // borderWidth: 1,
            }}>
            <Text>LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlPress('right');
            }}
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              // borderWidth: 1,
            }}>
            <Text>RIGHT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GameWrapper>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#dabe53',
    alignItems: 'center',
    width: '100%',
  },
});

export default CarGame;
