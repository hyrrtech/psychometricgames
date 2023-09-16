import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {constants, getNewAngle, newToValue} from '../../utilities/Fish Game';
import Svg, {Path} from 'react-native-svg';
import {fishColors as elementColors, frames} from './frames';

const {fishSize, speed} = constants;

const getDistance = (start, end) => {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
};

const Fish = ({
  ACTIONS,
  dispatch,
  interpolations,
  fishProps,
  level,
  setDemoState,
}) => {
  const {disabled, setDisabled, showDemo} = useContext(FishGameContext);
  const {id, initialFromValue, initialToValue, rotateFrom} = fishProps;
  const [isFed, setIsFed] = useState(false);
  const currentTranslationValueRef = useRef({
    from: initialFromValue,
    to: initialToValue,
  });

  const highlightAnimation = useRef(new Animated.Value(1)).current;
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
  const fishStopTime = useRef(Date.now());
  const segmentEndTime = useRef(Date.now());

  useEffect(() => {
    if (showDemo) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(highlightAnimation, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(highlightAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [showDemo]);

  const showFedAnimation = () => {
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
  };

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
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    return () => {
      interpolateAnimation.removeListener(listener);
    };
  }, []);

  useEffect(() => setIsFed(false), [level]);

  const handlePress = () => {
    if (isFed) {
      dispatch({type: ACTIONS.DECREASE_LIVES});
    } else {
      setIsFed(true);
      setDisabled(true);
      if (showDemo) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDemoState(prev => ({
          ...prev,
          demoStage: prev.demoStage + 1,
          baitCount: prev.baitCount - 1,
        }));
      } else {
        dispatch({type: ACTIONS.ON_FED});
      }
      showFedAnimation();
      rotationAnimation.stopAnimation();
      translateAnimation.stopAnimation(() => {
        fishStopTime.current = Date.now();
        setTimeout(() => {
          const newDuration = segmentEndTime.current - fishStopTime.current;
          animateFish(
            currentTranslationValueRef.current.from,
            currentTranslationValueRef.current.to,
            newDuration,
          );
        }, 1000);
      });
    }
  };
  const animateFish = (from, to, duration) => {
    currentTranslationValueRef.current = {from: from, to: to};

    const newTo = newToValue(to);

    if (!duration) {
      rotationAnimation.setValue(0);
      setRotationAngle(rotationAngle => ({
        from: rotationAngle.to,
        to: getNewAngle(from, to),
      }));

      const distance = getDistance(from, to);
      duration = (distance / speed) * 1000;
    }
    segmentEndTime.current = Date.now() + duration;
    Animated.parallel(
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
    ).start(({finished}) => {
      if (finished) {
        animateFish(to, newTo);
      }
    });
  };

  useEffect(() => {
    animateFish(initialFromValue, initialToValue);
  }, []);

  const disableTap = useMemo(() => {
    if (!showDemo) return disabled;
    return isFed;
  }, [disabled, showDemo]);

  return (
    <TouchableOpacity
      disabled={disableTap}
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
        // opacity={showDemo && !isFed ? highlightAnimation : 1}
        viewBox="0 0 224 340"
        style={{
          transform: [{rotateZ: '-90deg'}],
        }}>
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

export default Fish;
