import {useRef, useEffect} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import fish from '../../assets/fish.json';
import Lottie from 'lottie-react-native';
const {height, width} = Dimensions.get('window');
const translateX = width / 10;
const translateY = height / 9;

const SharkMatrix = ({matrix}) => {
  const animation = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    const X =
      Math.floor(Math.random() * (translateX - -translateX + 1)) + -translateX;
    const Y =
      Math.floor(Math.random() * (translateY - -translateY + 1)) + -translateY;
    Animated.timing(animation, {
      toValue: {
        x: X,
        y: Y,
      },
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: true, // For better performance on native platforms
    }).start();
  }, [matrix]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: animation.getTranslateTransform(),
        },
      ]}>
      {matrix.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((col, j) => (
            <View
              key={j}
              style={[
                styles.item,
                {transform: [{rotateY: col === 'RIGHT' ? '0deg' : '180deg'}]},
              ]}>
              {col ? (
                <Lottie
                  source={fish}
                  resizeMode="contain"
                  style={{width: '100%'}}
                  autoPlay
                  loop
                />
              ) : (
                <Lottie
                  source={fish}
                  resizeMode="contain"
                  style={{width: '100%', opacity: 0}}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: '10%',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  item: {flex: 0.25, marginHorizontal: '-1%', marginVertical: '-3%'},
});
export default SharkMatrix;
