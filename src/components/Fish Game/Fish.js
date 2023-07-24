import React, {useEffect, useState, useContext, useRef, memo} from 'react';
import {TouchableOpacity, Animated, Easing} from 'react-native';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {constants, getNewAngle, newToValue} from '../../utilities/Fish Game';
import Svg, {Path} from 'react-native-svg';
import {fishColors as elementColors, frames} from './frames';

const {fishSize, speed} = constants;

const getDistance = (start, end) => {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
};

const Fish = ({ACTIONS, dispatch, interpolations, fishProps}) => {
  const {disabled, setDisabled} = useContext(FishGameContext);
  const {id, initialFromValue, initialToValue, rotateFrom} = fishProps;
  const [isFed, setIsFed] = useState(false);
  const lastToValueRef = useRef(initialToValue);
  const fedAnimation = useRef(new Animated.Value(0)).current;
  const interpolateAnimation = useRef(new Animated.Value(0)).current;
  const translateAnimation = useRef(
    new Animated.ValueXY({x: initialFromValue.x, y: initialFromValue.y}),
  ).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const [rotationAngle, setRotationAngle] = useState({
    from: rotateFrom,
    to: rotateFrom,
  });

  const refs = useRef(
    Object.keys(frames[0]).reduce((acc, key) => {
      acc[key] = React.createRef();
      return acc;
    }, {}),
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(interpolateAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  const handlePress = () => {
    if (isFed) {
      dispatch({type: ACTIONS.DECREASE_LIVES});
    } else {
      translateAnimation.stopAnimation(value => {
        setIsFed(true);
        setDisabled(true);
        dispatch({type: ACTIONS.ON_FED});
        setTimeout(() => {
          animateFish(value, lastToValueRef.current);
        }, 1000);
      });
    }
  };

  const animateFish = (from, to) => {
    const rotateTo = getNewAngle(from, to);
    rotationAnimation.setValue(0);
    setRotationAngle(rotationAngle => {
      return {from: rotationAngle.to, to: rotateTo};
    });

    const distance = getDistance(from, to);
    const duration = (distance / speed) * 1000;

    const newTo = newToValue(to);
    lastToValueRef.current = newTo;

    const animation = Animated.parallel(
      [
        Animated.timing(rotationAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(translateAnimation, {
          toValue: to,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ],
      {stopTogether: false},
    );

    animation.start(({finished}) => {
      if (finished) {
        animateFish(to, newTo);
      }
    });
  };

  useEffect(() => {
    const listener = ({value}) => {
      const frameIndex = Math.floor(value * (frames.length - 1));
      const progress = value * (frames.length - 1) - frameIndex;

      Object.keys(frames[0]).forEach(key => {
        if (refs[key].current) {
          const path = interpolations[key][frameIndex](progress);
          refs[key].current.setNativeProps({d: path});
        }
      });
    };

    interpolateAnimation.addListener(listener);

    return () => {
      interpolateAnimation.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    animateFish(initialFromValue, initialToValue);
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPressIn={handlePress}
      style={{
        position: 'absolute',
        height: fishSize,
        width: fishSize,

        transform: [
          {translateX: translateAnimation.x},
          {translateY: translateAnimation.y},
          {
            rotateZ: rotationAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [rotationAngle.from, rotationAngle.to],
            }),
          },
        ],
      }}>
      <Svg
        width={fishSize}
        height={fishSize}
        viewBox="0 0 224 340"
        style={{transform: [{rotateZ: '-90deg'}]}}>
        {Object.keys(frames[0]).map(key => (
          <Path
            key={key}
            d={frames[0][key]}
            ref={refs[key]}
            fill={elementColors[key]}
            opacity={key === 'body' ? 0.8 : 1}
          />
        ))}
      </Svg>
    </TouchableOpacity>
  );
};

export default memo(Fish);
