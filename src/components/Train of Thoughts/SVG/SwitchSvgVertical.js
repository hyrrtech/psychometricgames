import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SwitchSvgVertical = ({height, width, rotation}) => (
  <Svg
    width={height}
    height={width}
    style={{transform: [{rotate: rotation}]}}
    viewBox="0 0 65 65"
    fill="none">
    <Path
      d="M32.5 63C49.3447 63 63 49.3447 63 32.5C63 15.6553 49.3447 2 32.5 2C15.6553 2 2 15.6553 2 32.5C2 49.3447 15.6553 63 32.5 63Z"
      fill="#4AA653"
      stroke="#1A3520"
      strokeWidth={4}
      strokeMiterlimit={10}
    />
    <Path
      d="M41 60.9162V3"
      stroke="#1A3520"
      strokeWidth={5}
      strokeMiterlimit={10}
    />
    <Path
      d="M24 60.9162V3"
      stroke="#1A3520"
      strokeWidth={5}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default SwitchSvgVertical;
