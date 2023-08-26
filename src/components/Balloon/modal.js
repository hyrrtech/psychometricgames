import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {useEffect, useRef} from 'react';
import {FontStyle} from '../../values/Font';
import {COLORS} from '../../values/Colors';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Modal = ({content, onPress, position}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight * 0.05, 0],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.container,
        {opacity: opacity, transform: [{translateY: translateY}]},
      ]}>
      <Text style={styles.text}>{content}</Text>
      <Text style={styles.text2}>Tap to Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FED7D7',
    padding: 20,
    borderRadius: 5,
    maxWidth: windowWidth * 0.7,
  },
  text: {
    color: COLORS.neutral_500,
    ...FontStyle.h4,
  },
  text2: {
    color: COLORS.neutral_500,
    ...FontStyle.H5_bold,
    alignSelf: 'center',
  },
});

export default Modal;
