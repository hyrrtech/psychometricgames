import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CurveSVG = ({height, width}) => (
  <Svg width={width} height={height} viewBox="0 0 37 35" fill="none">
    <Path
      d="M10.3914 30.1786L5.48048 25.0101L26.2241 2.13612L34.3237 10.6652L10.3914 30.1786Z"
      fill="#21502B"
    />
    <Path
      d="M0 22H8.17215C9.42738 22.0489 10.619 22.5678 11.5124 23.4546C12.4059 24.3415 12.9366 25.5321 13 26.7921V35"
      stroke="#1A3520"
      strokeWidth={5}
      strokeMiterlimit={10}
    />
    <Path
      d="M0 5.00134H16.0619C16.579 5.00134 23.802 4.78243 27.7771 9.94137C29.4247 12.1544 30.1936 14.8062 29.9585 17.4645V35"
      stroke="#1A3520"
      strokeWidth={5}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default CurveSVG;
