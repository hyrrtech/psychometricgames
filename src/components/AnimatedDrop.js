import {useEffect, useRef, useState, useContext, useMemo} from 'react';
import {Animated, Easing} from 'react-native';
import {CarGameContext} from '../providers/CarGame.Provider';
import {constants} from '../utilities/CarGame';

const {carYPosition, ROAD_HEIGHT, MIN_SPEED} = constants;

const DISTANCE_TO_BE_COVERED = ROAD_HEIGHT + 200;

const AnimatedDrop = ({
  children,
  destroy,
  objectType,
  lanePosition,
  id,
  startTime,
  objectHeight,
}) => {
  const {carPosition, setSpeed, speed, invincibleEffect} =
    useContext(CarGameContext);
  const [hasCollided, setHasCollided] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const [remaining, setRemaining] = useState(DISTANCE_TO_BE_COVERED);

  const distanceFromTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, ROAD_HEIGHT + 100],
  });



  useEffect(() => {
      const listenerid = distanceFromTop.addListener(({value}) => {
        setRemaining(DISTANCE_TO_BE_COVERED - Math.abs(value));
        distanceFromTop.removeListener(listenerid);
      });

      animation.addListener((val)=>console.log(val));
  }, [speed]);

  useEffect(()=>{
    let listenerid = null;
    if (objectType === 'obstacle'){
      listenerid = distanceFromTop.addListener(({value}) => {
          if (
          value >= carYPosition - objectHeight &&
          value < ROAD_HEIGHT &&
          lanePosition.position === carPosition
        ) {
          setHasCollided(true);
          setSpeed(MIN_SPEED);
          invincibleEffect();
        }
    });
  }
    return () => {
      setHasCollided(false);
      if(!!listenerid){
        distanceFromTop.removeListener(listenerid);
      }
    };
  },[carPosition])


  useEffect(() => {
    const duration = (remaining * 1000) / speed;
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => finished && destroy(id));
  }, [remaining, speed]);

  return (
    <Animated.View
      style={{
        transform: [
          {translateY: distanceFromTop},
          {translateX: objectType === 'obstacle' ? lanePosition.x : 0},
        ],
      }}>
      {children}
    </Animated.View>
  );
};
export default AnimatedDrop;
