import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const TrackSvg = ({height, width}) => (
  <Svg width={height} height={width} viewBox="0 0 30 27" fill="none">
    <Path d="M19.3 0H10.3V27H19.3V0Z" fill="#21502B" />
    <Path d="M0 22H30" stroke="#1A3520" strokeWidth={5} strokeMiterlimit={10} />
    <Path d="M0 5H30" stroke="#1A3520" strokeWidth={5} strokeMiterlimit={10} />
  </Svg>
);
export default TrackSvg;
