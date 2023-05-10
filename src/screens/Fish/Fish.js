import {View, Text, Animated, Dimensions, Easing} from 'react-native';
import {useRef, useEffect} from 'react';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const poundAreaHeight = WINDOW_HEIGHT * 0.7;
const poundAreaWidth = WINDOW_WIDTH * 0.9;
const speed = 100;
const fishHeight = 50;
const fishWidth = 20;

const newToValue = () => {
  const minX = poundAreaWidth * 0.05;
  const maxX = poundAreaWidth * 0.95;
  const minY = poundAreaHeight * 0.05;
  const maxY = poundAreaHeight * 0.9;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  return {x, y};
};

const getNewAngle = (from, to) => {
  const newAngle = `${
    (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI
  }deg`;
  return newAngle;
};

const FishModal = () => {
  const initialFromValue = newToValue();
  const initialToValue = newToValue();
  const initialAngle = getNewAngle(initialFromValue, initialToValue);
  const translateAnimation = useRef(
    new Animated.ValueXY({x: initialFromValue.x, y: initialFromValue.y}),
  ).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const previousAngle = useRef(initialAngle);
  let rotateY = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [previousAngle, initialAngle],
  });
  console.log('rotateY', rotateY);
  const Animate = (from, to) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2),
    );
    //constant relative duration for all distances
    const duration = (distance / speed) * 1000;

    const newAngle = getNewAngle(from, to);
    rotateY = rotationAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [previousAngle, newAngle],
    });
    previousAngle.current = newAngle;
    Animated.parallel([
      Animated.timing(translateAnimation, {
        toValue: {x: to.x, y: to.y},
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        const newTo = newToValue();
        rotationAnimation.setValue(0);
        Animate(to, newTo);
      }
    });
  };

  useEffect(() => {
    Animate(initialFromValue, initialToValue);
  }, [translateAnimation]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: fishHeight,
        width: fishWidth,
        backgroundColor: 'green',
        transform: [
          {translateX: translateAnimation.x},
          {translateY: translateAnimation.y},
          {rotateY: rotateY},
        ],
      }}>
      {/* head */}
      <View style={{height: '20%', backgroundColor: 'red'}} />
    </Animated.View>
  );
};

const Fish = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: poundAreaHeight,
          width: poundAreaWidth,
          backgroundColor: 'rgb(32, 156, 226)',
        }}>
        <FishModal />
        <FishModal />
        <FishModal />
        <FishModal />
      </View>
    </View>
  );
};
export default Fish;
