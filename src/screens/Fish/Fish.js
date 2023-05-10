import {View, Text, Animated, Dimensions, Easing} from 'react-native';
import {useRef, useEffect} from 'react';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const poundAreaHeight = WINDOW_HEIGHT * 0.7;
const poundAreaWidth = WINDOW_WIDTH * 0.9;
const speed = 100;
const fishHeight = 50;
const fishWidth = 20;

const FishModal = () => {
  const newToValue = () => {
    const minX = poundAreaWidth * 0.05;
    const maxX = poundAreaWidth * 0.95;
    const minY = poundAreaHeight * 0.05;
    const maxY = poundAreaHeight * 0.9;

    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    return {x, y};
  };
  const initialValue = newToValue();
  const animation = useRef(
    new Animated.ValueXY({x: initialValue.x, y: initialValue.y}),
  ).current;

  const Animate = (from, to) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2),
    );
    //constant relative duration for all distances
    const duration = (distance / speed) * 1000;

    Animated.timing(animation, {
      toValue: {x: to.x, y: to.y},
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        const newTo = newToValue();
        Animate(to, newTo);
      }
    });
  };

  useEffect(() => {
    Animate(initialValue, newToValue());
  }, [animation]);

  return (
    <Animated.View
      style={{
        backgroundColor: 'black',
        position: 'absolute',
        height: fishHeight,
        width: fishWidth,
        transform: [{translateX: animation.x}, {translateY: animation.y}],
      }}
    />
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
