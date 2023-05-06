import {useRef, useEffect, useState} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
const ScorePopup = ({scoreIncrement, pumpCount, POP_POINT}) => {
  const [visible, setVisible] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!(pumpCount === POP_POINT) && pumpCount !== 0) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setVisible(false);
          animation.setValue(1);
        }
      });
    }
  }, [pumpCount]);

  return (
    visible && (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.text}>+{Math.floor(scoreIncrement)}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(252, 186, 40)',
  },
});

export default ScorePopup;
