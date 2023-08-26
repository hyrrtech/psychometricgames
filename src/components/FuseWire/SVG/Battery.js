import {View, Animated, Easing} from 'react-native';
import {useRef, useEffect, useState, useContext} from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {FuseWireContext} from '../../../providers/FuseWire.Provider';

const Battery = ({height, width, styles}) => {
  const {ifAnswerCorrect, setIfAnswerCorrect} = useContext(FuseWireContext);
  const batteryHeight = height * 0.7;
  const batteryWidth = width * 0.7;
  const [batteryFilled, setBatteryFilled] = useState(false);
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const widthAnimation = useRef(new Animated.Value(0)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const shakeOffset = batteryWidth * 0.05;

  useEffect(() => {
    widthAnimation.addListener(({value}) => {
      if (value >= 82) {
        setBatteryFilled(true);
      }
    });
    return () => {
      widthAnimation.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (ifAnswerCorrect === true) {
      Animated.sequence([
        Animated.timing(widthAnimation, {
          toValue: 82,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1.2,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start(({finished}) => {
        if (finished) {
          setIfAnswerCorrect(null);
          Animated.timing(widthAnimation, {
            toValue: 0,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) setBatteryFilled(false);
          });
        }
      });
    } else if (ifAnswerCorrect === false) {
      Animated.sequence([
        Animated.timing(widthAnimation, {
          toValue: 41,
          duration: 410,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shakeAnimation, {
          toValue: shakeOffset,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -shakeOffset * 2,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnimation, {
          toValue: 0,
          duration: 410,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(({finished}) => {
        if (finished) setIfAnswerCorrect(null);
      });
    }
  }, [ifAnswerCorrect]);

  const interpolatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f98504', '#fbd318'],
  });

  return (
    <View style={styles}>
      <AnimatedSvg
        style={{
          transform: [{scale: scaleAnimation}, {translateX: shakeAnimation}],
        }}
        width={batteryWidth}
        height={batteryHeight}
        viewBox="0 0 95 50"
        fill="none">
        <AnimatedRect
          width={widthAnimation}
          height={47.5}
          fill={interpolatedColor}
        />
        {batteryFilled ? (
          <Path
            d="M24 26.2317L29.0618 20.8271L36.891 29.1783L53.9432 11L59 16.4046L36.891 39L24 26.2317Z"
            fill="#FFFDF7"
          />
        ) : (
          <Path
            d="M41.14 7.38C37.9933 13.68 34.8467 19.9767 31.7 26.27H41.14V41.89L50.59 23.89H41.14V7.38Z"
            fill="#FFFDF7"
          />
        )}

        <Path
          d="M77.78 1H4.5C2.567 1 1 2.567 1 4.5V44.72C1 46.653 2.567 48.22 4.5 48.22H77.78C79.713 48.22 81.28 46.653 81.28 44.72V4.5C81.28 2.567 79.713 1 77.78 1Z"
          stroke="#FFCE13"
          strokeWidth={3}
        />

        <Path d="M94.27 14.52H81.85V35.77H94.27V14.52Z" fill="#fbd318" />
      </AnimatedSvg>
    </View>
  );
};

export default Battery;
