import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import React, {useEffect, useRef} from 'react';
import {constants} from '../../utilities/Star Search';
const {indicatorSize, answerIndicatorAnimationTime} = constants;

const IncorrectIndicator = ({position, setIncorrectIndicator}) => {
  const animation = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: answerIndicatorAnimationTime * 0.5,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(answerIndicatorAnimationTime * 0.5),
      Animated.timing(animation, {
        toValue: 0,
        duration: answerIndicatorAnimationTime * 0.2,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => finished && setIncorrectIndicator({show: false}));
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: position.x - indicatorSize / 2,
          top: position.y - indicatorSize / 2,
          transform: [{scale: animation}],
        },
      ]}>
      <Svg
        width={indicatorSize * 0.8}
        height={indicatorSize * 0.8}
        viewBox="0 0 64 63"
        fill="none">
        <Path
          d="M60.9063 8.4808C61.5064 9.08092 61.8435 9.89482 61.8435 10.7435C61.8435 11.5922 61.5063 12.4062 60.9062 13.0063L13.3462 60.5663C12.7461 61.1664 11.9322 61.5035 11.0835 61.5035C10.2348 61.5035 9.42088 61.1664 8.82077 60.5663L2.75373 54.4993C2.15362 53.8992 1.81651 53.0853 1.81651 52.2366C1.81651 51.3879 2.15362 50.574 2.75373 49.9739L50.3137 2.41386C50.9139 1.81374 51.7278 1.47654 52.5765 1.47654C53.4252 1.47655 54.2391 1.81365 54.8392 2.41377L60.9063 8.4808Z"
          fill="#FF5A54"
        />
        <Path
          d="M54.32 60.3162C53.7124 60.9239 52.8883 61.2652 52.029 61.2652C51.1697 61.2652 50.3456 60.9239 49.7379 60.3162L2.29101 12.8693C1.68339 12.2617 1.34204 11.4376 1.34204 10.5783C1.34204 9.71899 1.68339 8.89489 2.29101 8.28727L8.28726 2.29102C8.89488 1.6834 9.71898 1.34205 10.5783 1.34205C11.4376 1.34205 12.2617 1.6834 12.8693 2.29102L60.3162 49.738C60.9238 50.3456 61.2652 51.1697 61.2652 52.029C61.2652 52.8883 60.9238 53.7124 60.3162 54.32L54.32 60.3162Z"
          fill="#FF5A54"
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: indicatorSize,
    width: indicatorSize,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: indicatorSize / 2,
  },
});

export default IncorrectIndicator;
