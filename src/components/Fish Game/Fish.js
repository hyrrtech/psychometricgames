import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  createRef,
} from 'react';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {constants, getNewAngle, newToValue} from '../../utilities/Fish Game';
import Svg, {Path} from 'react-native-svg';
import {fishColors as elementColors, frames} from './frames';
const {fishSize, speed} = constants;

const Fish = ({id, ACTIONS, dispatch, interpolations}) => {
  const {disabled, setDisabled} = useContext(FishGameContext);
  const [fed, setFed] = useState(false);

  const {rotateFrom, initialFromValue, initialToValue} = useMemo(() => {
    const initialFromValue = newToValue();
    const initialToValue = newToValue();
    const rotateFrom = getNewAngle(initialFromValue, initialToValue);
    return {rotateFrom, initialFromValue, initialToValue};
  }, []);

  const [rotationAngle, setRotationAngle] = useState({
    from: rotateFrom,
    to: rotateFrom,
  });

  const fedAnimation = useRef(new Animated.Value(0)).current;

  const interpolateAnimation = useRef(new Animated.Value(0)).current;

  const refs = useRef(
    Object.keys(frames[0]).reduce((acc, key) => {
      acc[key] = createRef();
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

    return () => {
      interpolateAnimation.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(interpolateAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);
  // const showFedAnimation = () => {
  //   Animated.timing(fedAnimation, {
  //     toValue: 1,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start(({finished}) => {
  //     if (finished) {
  //       fedAnimation.setValue(0);
  //     }
  //   });
  // };

  const translateAnimation = useRef(
    new Animated.ValueXY({x: initialFromValue.x, y: initialFromValue.y}),
  ).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;

  const Animate = (from, to) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2),
    );
    const duration = (distance / speed) * 1000;
    let rotateTo = getNewAngle(from, to);

    setRotationAngle(rotationAngle => {
      return {from: rotationAngle.to, to: rotateTo};
    });

    Animated.parallel([
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnimation, {
        toValue: {x: to.x, y: to.y},
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        let newTo = newToValue();
        rotationAnimation.setValue(0);
        Animate(to, newTo);
      }
    });
  };

  useEffect(() => {
    Animate(initialFromValue, initialToValue);
  }, []);

  const handlePress = () => {
    // console.log('pressed', id, fed);
    if (fed) {
      dispatch({type: ACTIONS.DECREASE_LIVES});
    } else {
      translateAnimation.stopAnimation(async value => {
        // showFedAnimation();
        setFed(true);
        setDisabled(true);
        dispatch({type: ACTIONS.ON_FED});
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // Animate(value, initialToValue);
      });
    }
  };

  const strokeKeys = [
    'bottom_left_branch',
    'top_left_branch',
    'bottom_right_branch',
    'top_right_branch',
  ];

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
            stroke={strokeKeys.includes(key) ? elementColors[key] : 'none'}
            fill={elementColors[key]}
            opacity={key === 'body' ? 0.8 : 1}
          />
        ))}
      </Svg>
    </TouchableOpacity>
  );
};

export default Fish;
