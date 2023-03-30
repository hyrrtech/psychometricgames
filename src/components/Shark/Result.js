import {useEffect, useRef} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';
import {ResultAnimationTime} from '../../screens/SHARK/initialState';
import {FontStyle} from '../../values/Font';
const Result = ({result}) => {
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: ResultAnimationTime,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: ResultAnimationTime,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: result === 'correct' ? '#66bb6a' : '#ff5a54',
          opacity: opacityAnimation,
        },
      ]}>
      <Text style={styles.text}>
        {result === 'correct' ? 'Correct' : 'Wrong'}
      </Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 50,

    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 3,
    flex: 1,
  },
  text: {
    ...FontStyle.h1,
    color: 'white',
  },
});
export default Result;
