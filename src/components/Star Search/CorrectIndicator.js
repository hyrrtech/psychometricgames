import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import React, {useEffect, useRef} from 'react';
import {constants} from '../../utilities/Star Search';
const {indicatorSize, answerIndicatorAnimationTime} = constants;

const CorrectIndicator = ({position, setCorrectIndicator}) => {
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
    ]).start(({finished}) => finished && setCorrectIndicator({show: false}));
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
        viewBox="0 0 71 56"
        fill="none">
        <Path
          d="M23.179 48.1754C22.5714 48.783 21.8918 49.2688 21.2897 49.526C20.6875 49.7832 20.2122 49.7906 19.9683 49.5467L0.920608 30.499C0.676678 30.2551 0.684118 29.7798 0.941284 29.1776C1.19845 28.5755 1.68427 27.8959 2.29189 27.2882L8.28814 21.292C8.89576 20.6844 9.57539 20.1986 10.1775 19.9414C10.7797 19.6842 11.255 19.6768 11.4989 19.9207L30.5466 38.9684C30.7905 39.2123 30.7831 39.6876 30.5259 40.2898C30.2687 40.8919 29.7829 41.5715 29.1753 42.1791L23.179 48.1754Z"
          fill="#66BB6A"
        />
        <Path
          d="M68.5565 8.70081C69.1397 9.28405 69.4997 10.0427 69.5575 10.8098C69.6152 11.5769 69.3658 12.2897 68.8642 12.7913L27.8995 53.756C27.6511 54.0044 27.3484 54.1934 27.0084 54.3124C26.6684 54.4313 26.2978 54.4779 25.918 54.4493C25.5382 54.4207 25.1565 54.3176 24.7947 54.1458C24.4328 53.9741 24.0979 53.737 23.8091 53.4483L17.7421 47.3813C17.4533 47.0925 17.2163 46.7576 17.0445 46.3957C16.8728 46.0338 16.7696 45.6521 16.741 45.2723C16.7124 44.8924 16.759 44.522 16.878 44.182C16.9969 43.842 17.1859 43.5392 17.4343 43.2908L58.399 2.32609C58.9006 1.82448 59.6133 1.5751 60.3804 1.63281C61.1475 1.69053 61.9063 2.05063 62.4896 2.63387L68.5565 8.70081Z"
          fill="#66BB6A"
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

export default CorrectIndicator;
