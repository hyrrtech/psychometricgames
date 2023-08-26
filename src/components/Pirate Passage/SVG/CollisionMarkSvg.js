import {useRef, useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const CollisionMarkSvg = ({height, width}) => {
  const [showCollisionMark, setShowCollisionMark] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scaleAnimation.addListener(({value}) => {
      if (value > 0.7) {
        setShowCollisionMark(true);
      }
    });
    return () => {
      scaleAnimation.removeAllListeners();
    };
  }, []);
  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AnimatedSvg
      width={width}
      height={height}
      viewBox="0 0 104 100"
      fill="none"
      style={{transform: [{scale: scaleAnimation}]}}>
      <Path
        d="M100.043 49.1732C107.046 64.8172 104.592 81.8924 93.9602 91.3676C78.9065 104.791 46.9398 103.393 28.1498 81.2672C20.1809 79.7077 13.0396 75.7053 7.91694 69.9278C2.79429 64.1502 0 56.9467 0 49.5187C0 42.0906 2.79429 34.8871 7.91694 29.1095C13.0396 23.332 20.1809 19.3296 28.1498 17.7701C33.1358 10.3329 40.8338 4.73143 49.8956 1.94649C58.9575 -0.838451 68.8056 -0.629282 77.7152 2.53736C96.9746 9.70958 107.245 30.305 100.043 49.1732Z"
        fill="white"
      />
      {showCollisionMark && (
        <G>
          <Path
            d="M82.6 78L29 53.12"
            stroke="#F47522"
            strokeWidth={5}
            strokeMiterlimit={10}
          />
          <Path
            d="M82.6 53.12L29 78"
            stroke="#F47522"
            strokeWidth={5}
            strokeMiterlimit={10}
          />
          <Path
            d="M55.8 53.28C66.3708 53.28 74.94 44.7107 74.94 34.14C74.94 23.5693 66.3708 15 55.8 15C45.2293 15 36.66 23.5693 36.66 34.14C36.66 44.7107 45.2293 53.28 55.8 53.28Z"
            fill="#F47521"
          />
        </G>
      )}
    </AnimatedSvg>
  );
};
export default CollisionMarkSvg;
