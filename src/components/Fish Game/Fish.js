import {View, TouchableOpacity, Animated, Easing} from 'react-native';
import {useEffect, useState, useContext, useMemo, useRef} from 'react';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {constants, getNewAngle, newToValue} from '../../utilities/Fish Game';
const {poundAreaHeight, poundAreaWidth, fishHeight, fishWidth, speed} =
  constants;

const Fish = () => {
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
        duration: 500,
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
    if (fed) {
      //game over dispatch method
    } else {
      setFed(true);
      setDisabled(true);
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
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'green',
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
      <View style={{height: '100%', width: '20%', backgroundColor: 'red'}} />
    </TouchableOpacity>
  );
};

export default Fish;
