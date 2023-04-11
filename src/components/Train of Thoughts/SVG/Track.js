import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Track = ({height, width}) => (
  <Svg width={height} height={width} viewBox="0 0 33 35" fill="none">
    <Path d="M23.7494 0H9.8981V35H23.7494V0Z" fill="#21502B" />
    <Path
      d="M0 8.06085L32.9957 8.06085"
      stroke="#1A3520"
      strokeWidth={3}
      strokeMiterlimit={10}
    />
    <Path
      d="M0.0043335 27.8846L33 27.8846"
      stroke="#1A3520"
      strokeWidth={3}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default Track;
