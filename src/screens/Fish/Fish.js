import {View, Text, Animated, Dimensions, Easing} from 'react-native';
import {useRef, useEffect, useState, useMemo} from 'react';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const poundAreaHeight = WINDOW_HEIGHT * 0.7;
const poundAreaWidth = WINDOW_WIDTH * 0.9;
const speed = 50;
const fishHeight = 20;
const fishWidth = 50;

const newToValue = () => {
  const minX = poundAreaWidth * 0.05;
  const maxX = poundAreaWidth * 0.95;
  const minY = poundAreaHeight * 0.05;
  const maxY = poundAreaHeight * 0.9;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  return {x, y};
};

const getNewAngle = (a, b) => {
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  return `${angle}rad`;
};
function removeDeg(stringWithDeg) {
  const numberPart = stringWithDeg.replace('deg', '');
  return parseFloat(numberPart);
}

const FishModal = () => {
  const rotateFrom = useMemo(() => {
    const initialFromValue = newToValue();
    const initialToValue = newToValue();
    return getNewAngle(initialFromValue, initialToValue);
  });
  const [rotationAngle, setRotationAngle] = useState({
    from: rotateFrom,
    to: rotateFrom,
  });
  const translateAnimation = useRef(
    new Animated.ValueXY({x: 0.05, y: 0.05}),
  ).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  console.log(rotationAngle);
  const Animate = (from, to) => {
    console.log(from, to);
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
    Animate(newToValue(), newToValue());
  }, []);

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
        <FishModal key={1} />
      </View>
    </View>
  );
};
export default Fish;
