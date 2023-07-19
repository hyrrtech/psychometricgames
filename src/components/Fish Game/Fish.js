import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {useEffect, useState, useContext, useMemo, useRef} from 'react';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {constants, getNewAngle, newToValue} from '../../utilities/Fish Game';
const {poundAreaHeight, poundAreaWidth, fishHeight, fishWidth, speed} =
  constants;

const Fish = ({id, ACTIONS, dispatch}) => {
  const {disabled, setDisabled} = useContext(FishGameContext);
  const [fed, setFed] = useState(false);

  const {rotateFrom, initialFromValue, initialToValue} = useMemo(() => {
    const initialFromValue = newToValue();
    const initialToValue = newToValue();
    const rotateFrom = getNewAngle(initialFromValue, initialToValue);
    return {rotateFrom, initialFromValue, initialToValue};
  }, []);

  const fedAnimation = useRef(new Animated.Value(0)).current;

  const showFedAnimation = () => {
    Animated.timing(fedAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        fedAnimation.setValue(0);
      }
    });
  };

  const [rotationAngle, setRotationAngle] = useState({
    from: rotateFrom,
    to: rotateFrom,
  });

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
    console.log('pressed', id, fed);
    if (fed) {
      dispatch({type: ACTIONS.DECREASE_LIVES});
    } else {
      translateAnimation.stopAnimation(async value => {
        showFedAnimation();
        setFed(true);
        setDisabled(true);
        dispatch({type: ACTIONS.ON_FED});
        await new Promise(resolve => setTimeout(resolve, 5000));
        Animate(value, initialToValue);
      });
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPressIn={handlePress}
      style={{
        position: 'absolute',
        height: fishHeight,
        width: fishWidth,
        overflow: 'hidden',
        borderWidth: 1,

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
      {/* head */}
      <Text style={{position: 'absolute', zIndex: 2, color: 'white'}}>
        {id}
      </Text>

      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          height: '100%',
          width: '30%',
          backgroundColor: 'blue',
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          height: '100%',
          width: '40%',
          backgroundColor: 'red',
          opacity: fedAnimation,
        }}
      />
    </TouchableOpacity>
  );
};

export default Fish;
