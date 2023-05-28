import {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const ResultPopup = ({result, animationDuration}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animation,
          transform: [{scale: animation}],
        },
      ]}>
      <Svg width={175} height={175} viewBox="0 0 24 24" fill="none">
        {result === 'correct' ? (
          <Path
            d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z"
            fill="#66BB6A"
          />
        ) : (
          <Path
            d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z"
            fill="#FF5A54"
          />
        )}
      </Svg>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 3,
    flex: 1,
  },
});
