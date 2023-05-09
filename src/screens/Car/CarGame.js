import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
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
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';

const {
  CAR_WIDTH,
  CAR_HEIGHT,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  ROAD_HEIGHT,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_WIDTH,
  ROAD_WIDTH,
  SKY_HEIGHT,
  WINDOW_HEIGHT,
  DISTANCE_BETWEEN_LINES,
} = constants;

const obstacleGenerator = new ComponentGenerator();
const roadLineGenerator = new ComponentGenerator();

const CarGame = ({navigation}) => {
  const {
    carPosition,
    setCarPosition,
    invincibleAnimation,
    carPositionRef,
    speed,
  } = useContext(CarGameContext);
  const {user} = useContext(AuthContext);
  const [roadLines, setRoadLines] = useState(new Set());
  const [objects, setObjects] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [completedPopup, setCompletedPopup] = useState(false);
  const {TIME} = useCountdown(0, 30);
  const linesPassed = useRef(0);

  const opacity = invincibleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const updateDB = (distanceTraveled, uid) => {
    const GameRef = db.ref(`/users/${uid}/CarGame/`);
    GameRef.set({
      distanceTraveled: distanceTraveled,
    });
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (TIME === '00:00') {
      updateDB(linesPassed.current * ROAD_HEIGHT, user.uid);
    }
  }, [TIME]);

  const getSpawnDuration = useCallback(() => {
    const duration = 2000 * (DISTANCE_BETWEEN_LINES / speed);
    return duration;
  }, [speed]);

  const handlPress = to => {
    if (carPosition !== to) {
      const {translateValue, newPosition} = getNewCarPosition(carPosition, to);
      Animated.timing(carPositionRef, {
        toValue: translateValue,
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
      linesPassed.current += 1;
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
    }, getSpawnDuration() * 1.5);
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

  const moveRoad = useMemo(() => {
    if (carPosition === 'left')
      return {translateX: ROAD_WIDTH * 0.5, rotateZ: '-2deg'};
    if (carPosition === 'center') return {translateX: 0, rotateZ: '0deg'};
    if (carPosition === 'right')
      return {translateX: -ROAD_WIDTH * 0.5, rotateZ: '2deg'};
  }, [carPosition]);

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
        <InfoLabel
          label={'Speed'}
          value={speed}
          style={styles.infoLabel}
          key="speed"
        />,
      ]}>
      <View style={styles.background}>
        <Sky skyHeight={SKY_HEIGHT} />
        <Road
          roadHeight={ROAD_HEIGHT}
          roadWidth={ROAD_WIDTH}
          roadLineWidth={ROAD_LINE_WIDTH}
          interpolation={moveRoad}>
          {renderLines()}
          {renderObjects()}

          <Animated.View
            style={[
              {
                position: 'absolute',
                height: CAR_HEIGHT,
                bottom: 0,
                opacity: opacity,
                transform: [{translateX: carPositionRef}],
                width: CAR_WIDTH,
                backgroundColor: 'red',
              },
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
            style={styles.button}>
            <Text>LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlPress('right');
            }}
            style={styles.button}>
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
  button: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default CarGame;
