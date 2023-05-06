import {useState} from 'react';
import Svg, {Defs, LinearGradient, Stop} from 'react-native-svg';
import {Animated, TouchableOpacity} from 'react-native';
import ButterflyPath from './ButterflyPath';
import KilledButterflyPath from './KilledButterflyPath';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const Butterfly = ({dimensions, onPress, disabled}) => {
  const [squished, setSquished] = useState(false);

  const handlePress = () => {
    setSquished(true);
    onPress();
    setTimeout(() => {
      setSquished(false);
    }, 500);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      onPress={() => handlePress()}>
      <AnimatedSvg width={dimensions} height={dimensions} viewBox="0 0 906 692">
        {squished ? <KilledButterflyPath /> : <ButterflyPath />}
        <Defs>
          <LinearGradient
            id="paint0_linear_1_2136"
            x1={328.367}
            y1={185.157}
            x2={34.4122}
            y2={437.814}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.0618472} stopColor="#bdc1c6" />
            <Stop offset={0.1561} stopColor="#9aa0a6" />
            <Stop offset={0.5453} stopColor="#dadce0" />
            <Stop offset={0.6246} stopColor="#bdc1c6" />
            <Stop offset={0.6664} stopColor="#9aa0a6" />
            <Stop offset={0.7301} stopColor="#80868b" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_1_2136"
            x1={578.247}
            y1={185.157}
            x2={872.201}
            y2={437.813}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.0618472} stopColor="#bdc1c6" />
            <Stop offset={0.1561} stopColor="#9aa0a6" />
            <Stop offset={0.5453} stopColor="#dadce0" />
            <Stop offset={0.6246} stopColor="#bdc1c6" />
            <Stop offset={0.6664} stopColor="#9aa0a6" />
            <Stop offset={0.7301} stopColor="#80868b" />
          </LinearGradient>
        </Defs>
      </AnimatedSvg>
    </TouchableOpacity>
  );
};
export default Butterfly;
