import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {useMemo, useState, useRef, useEffect} from 'react';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const lillipadSize = spawnAreaHeight * 0.15;
const frogSize = spawnAreaHeight * 0.06;
const speed = 500;

const randomLillipadPosition = (num_of_lillipads, lillipadSize) => {
  let lillipads = [];
  for (let i = 0; i < num_of_lillipads; i++) {
    let newLillipad = {};
    const lillipadMaxTop = spawnAreaHeight - lillipadSize;
    const lillipadMaxLeft = spawnAreaWidth - lillipadSize;
    let lillipadY, lillipadX;
    do {
      lillipadY = Math.floor(Math.random() * lillipadMaxTop);
      lillipadX = Math.floor(Math.random() * lillipadMaxLeft);
    } while (
      lillipads.some(
        lillipad =>
          lillipad.lillipadPos.x + lillipadSize > lillipadX &&
          lillipad.lillipadPos.y + lillipadSize > lillipadY &&
          lillipad.lillipadPos.x < lillipadX + lillipadSize &&
          lillipad.lillipadPos.y < lillipadY + lillipadSize,
      )
    );
    newLillipad.lillipadPos = {x: lillipadX, y: lillipadY};
    lillipads.push(newLillipad);
  }
  return lillipads;
};

const Frog = ({initialPosition, position}) => {
  const animation = useRef(
    new Animated.ValueXY({x: initialPosition.x, y: initialPosition.y}),
  ).current;
  const previousPosition = useRef(initialPosition);
  const distance = Math.sqrt(
    Math.pow(position.x - previousPosition.current.x, 2) +
      Math.pow(position.y - previousPosition.current.y, 2),
  );
  const duration = (distance * 1000) / speed;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: {x: position.x, y: position.y},
      duration: duration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        animation.setValue({x: position.x, y: position.y});
        previousPosition.current = position;
      }
    });
  }, [position]);
  return (
    <Animated.View
      style={[
        styles.frog,
        {
          transform: [{translateX: animation.x}, {translateY: animation.y}],
        },
      ]}></Animated.View>
  );
};

const FrogJump = () => {
  const lillipads = useMemo(() => randomLillipadPosition(5, lillipadSize), []);
  const initialFrogPosition =
    lillipads[Math.floor(Math.random() * lillipads.length)].lillipadPos;
  const [frogPosition, setFrogPosition] = useState({
    x: initialFrogPosition.x + (lillipadSize - frogSize) / 2,
    y: initialFrogPosition.y + (lillipadSize - frogSize) / 2,
  });

  const Lillipad = ({position}) => {
    return (
      <TouchableOpacity
        onPressIn={() =>
          setFrogPosition({
            x: position.x + (lillipadSize - frogSize) / 2,
            y: position.y + (lillipadSize - frogSize) / 2,
          })
        }
        activeOpacity={0.5}
        style={[
          styles.lillipad,
          {top: position.y, left: position.x},
        ]}></TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
          backgroundColor: '#1b5256',
        }}>
        {lillipads.map((lillipad, index) => {
          return <Lillipad key={index} position={lillipad.lillipadPos} />;
        })}
        <Frog position={frogPosition} initialPosition={frogPosition} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lillipad: {
    position: 'absolute',
    width: lillipadSize,
    height: lillipadSize,
    backgroundColor: '#569e53',
    borderColor: '#0f3730',
    borderWidth: 5,
    borderRadius: lillipadSize / 2,
  },
  frog: {
    position: 'absolute',
    width: frogSize,
    height: frogSize,
    backgroundColor: 'red',
    borderRadius: 10,
    // zIndex: 2,
  },
});

export default FrogJump;
