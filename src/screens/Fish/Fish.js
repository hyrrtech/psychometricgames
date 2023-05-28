import {
  View,
  Text,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {useRef, useEffect, useState} from 'react';

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

const getNewAngle = a => `${(Math.atan(a.y, a.x) * 180) / Math.PI}deg`;

const FishModal = ({id, fed, setFishes}) => {
  const initialFromValue = newToValue();
  const initialToValue = newToValue();
  const rotateFrom = getNewAngle(initialFromValue);
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

    const rotateTo = getNewAngle(to);
    // console.log(rotateTo, rotationAngle);
    //constant relative duration for all distances
    const duration = (distance / speed) * 1000;

    setRotationAngle(rotationAngle => {
      return {...rotationAngle, to: rotateTo};
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
        const newTo = newToValue();
        setRotationAngle(rotationAngle => {
          return {...rotationAngle, from: rotateTo};
        });
        rotationAnimation.setValue(0);
        Animate(to, newTo);
      }
    });
  };

  useEffect(() => {
    Animate(initialFromValue, initialToValue);
  }, [translateAnimation]);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <AnimatedTouchable
      //onpress set fed = true
      onPress={() =>
        setFishes(fishes =>
          fishes.map(fish => (fish.id === id ? {...fish, fed: true} : fish)),
        )
      }
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
      <View style={{height: '20%', backgroundColor: 'red'}} />
    </AnimatedTouchable>
  );
};
const generateFishes = number_of_fishes => {
  const fishes = [];
  for (let i = 0; i < number_of_fishes; i++) {
    fishes.push({id: i, fed: false});
  }
  return fishes;
};

const Fish = () => {
  const [fishes, setFishes] = useState(generateFishes(5));
  console.log(fishes);

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
        {fishes.map(fish => (
          <FishModal
            key={fish.id}
            id={fish.id}
            setFishes={setFishes}
            fed={fish.fed}
          />
        ))}
      </View>
    </View>
  );
};
export default Fish;
