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
  const currentTranslationValueRef = useRef({
    from: initialFromValue,
    to: initialToValue,
  });

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

    Animated.loop(
      Animated.timing(interpolateAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    return () => {
      interpolateAnimation.removeListener(listener);
    };
  }, []);

  const handlePress = () => {
    if (isFed) {
      dispatch({type: ACTIONS.DECREASE_LIVES});
    } else {
      translateAnimation.stopAnimation(value => {
        setTimeout(() => {
          const distanceToCover = getDistance(
            value,
            currentTranslationValueRef.current.to,
          );
          const remainingDuration = (distanceToCover / speed) * 1000;
          rotationAnimation.setValue(0);

          animateFish(
            value,
            currentTranslationValueRef.current.to,
            remainingDuration,
          );
        }, 1000);
      });

      setIsFed(true);
      setDisabled(true);
      dispatch({type: ACTIONS.ON_FED});

      Animated.sequence([
        Animated.timing(fedAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(fedAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start();
    }
  };
  const animateFish = (from, to, duration) => {
    const newTo = newToValue(to);
    currentTranslationValueRef.current = {from: from, to: to};

    const rotateTo = getNewAngle(from, to);

    setRotationAngle(rotationAngle => {
      return {from: rotationAngle.to, to: rotateTo};
    });
    const distance = getDistance(from, to);
    if (!duration) duration = (distance / speed) * 1000;

    const animation = Animated.parallel(
      [
        Animated.timing(rotationAnimation, {
          toValue: 1,
          duration: duration / 5,
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
      {stopTogether: true},
    );

    animation.start(({finished}) => {
      if (finished) {
        rotationAnimation.setValue(0);
        animateFish(to, newTo);
      }
    });
  };

  useEffect(() => {
    animateFish(initialFromValue, initialToValue);
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      onPress={handlePress}
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
          {
            scale: fedAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2],
            }),
          },
        ],
      }}>
      <Svg
        pointerEvents="none"
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
