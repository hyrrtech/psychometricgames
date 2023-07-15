import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
const HolderSvg = ({height, width}) => (
  <Svg width={width} height={height} viewBox="0 0 72 61" fill="none">
    <Path
      d="M6.66998 59.84L64.69 59.84C67.8214 59.84 70.36 57.3015 70.36 54.17V31.67C70.36 28.5386 67.8214 26 64.69 26L6.66998 26C3.53853 26 0.999985 28.5386 0.999985 31.67V54.17C0.999985 57.3015 3.53853 59.84 6.66998 59.84Z"
      fill="#d49d29"
      stroke="#c46100"
      strokeWidth={3}
    />
    <Path d="M28.91 37.84H13.68V47.99H28.91V37.84Z" fill="#9a4a21" />
    <Path d="M57.67 37.84H42.44V47.99H57.67V37.84Z" fill="#9a4a21" />
  </Svg>
);
export default HolderSvg;
