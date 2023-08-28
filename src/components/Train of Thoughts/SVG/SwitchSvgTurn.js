import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SwitchSvgTurn = ({
  height,
  width,
  rotation,
  scaleX,
  showOnlyTrack,
  backgroundColor,
}) => {
  const scale = scaleX ? scaleX : 1;
  return (
    <Svg
      width={height}
      height={width}
      style={{transform: [{rotate: rotation}, {scaleX: scale}]}}
      viewBox="0 0 65 65"
      fill="none">
      {!showOnlyTrack && (
        <Path
          d="M32.5 63C49.3447 63 63 49.3447 63 32.5C63 15.6553 49.3447 2 32.5 2C15.6553 2 2 15.6553 2 32.5C2 49.3447 15.6553 63 32.5 63Z"
          fill={backgroundColor}
          stroke="#1A3520"
          strokeWidth={4}
          strokeMiterlimit={10}
        />
      )}

      <Path
        d="M4.12 23.3H24C24.65 23.3 33.58 23 38.5 30.07C40.5392 33.1028 41.4909 36.737 41.2 40.38V60.25"
        stroke="#1A3520"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M3.12 40.7H16.12C18.1035 40.781 19.986 41.5966 21.4017 42.9883C22.8173 44.3799 23.665 46.2482 23.78 48.23V61.23"
        stroke="#1A3520"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
};
export default SwitchSvgTurn;
