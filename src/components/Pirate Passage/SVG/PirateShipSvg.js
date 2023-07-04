import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function adjustHexColor(hexColor, amount) {
  // Remove the # symbol if present
  hexColor = hexColor.replace('#', '');

  // Convert the hex color to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  // Calculate the darkened RGB values
  const darkenedR = Math.max(r - amount, 0);
  const darkenedG = Math.max(g - amount, 0);
  const darkenedB = Math.max(b - amount, 0);

  // Convert the darkened RGB values back to hex
  const darkenedHex =
    '#' +
    darkenedR.toString(16).padStart(2, '0') +
    darkenedG.toString(16).padStart(2, '0') +
    darkenedB.toString(16).padStart(2, '0');

  // Calculate the lightened RGB values
  const lightenedR = Math.min(r + amount, 255);
  const lightenedG = Math.min(g + amount, 255);
  const lightenedB = Math.min(b + amount, 255);

  // Convert the lightened RGB values back to hex
  const lightenedHex =
    '#' +
    lightenedR.toString(16).padStart(2, '0') +
    lightenedG.toString(16).padStart(2, '0') +
    lightenedB.toString(16).padStart(2, '0');

  return {
    darkened: darkenedHex,
    lightened: lightenedHex,
  };
}

const PirateShipSvg = ({height, width, color}) => {
  const {darkened, lightened} = adjustHexColor(color, 20);

  return (
    <Svg width={width} height={height} viewBox="0 0 100 121" fill="none">
      <Path
        d="M77.503 97.4895C76.244 103.506 72.8138 108.924 67.798 112.818C62.7822 116.712 56.4917 118.84 49.9999 118.84C43.5081 118.84 37.2176 116.712 32.2018 112.818C27.186 108.924 23.7559 103.506 22.4968 97.4895C22.9055 80.8946 23.3177 64.2997 23.7335 47.7047L51.6936 3L77.503 47.6031V97.4895Z"
        fill={color}
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path
        d="M49.6396 42.0252L50.3602 105.933"
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path
        d="M98 95.4575L90.4723 48.7207H8.86098L2 95.4575H98Z"
        fill={lightened}
      />
      <Path
        d="M65.0609 54.8168L34.95 68.0251"
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path
        d="M65.0609 68.0251L34.95 54.8168"
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path
        d="M2.13984 98.5056L97.8495 98.5056V95.4575L2.13984 95.4575V98.5056Z"
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Path
        d="M50.0054 90.3774C55.9446 90.3774 60.7593 85.8286 60.7593 80.2173C60.7593 74.606 55.9446 70.0571 50.0054 70.0571C44.0661 70.0571 39.2515 74.606 39.2515 80.2173C39.2515 85.8286 44.0661 90.3774 50.0054 90.3774Z"
        fill={darkened}
        stroke={darkened}
        strokeWidth={3}
        strokeMiterlimit={10}
      />
    </Svg>
  );
};
export default PirateShipSvg;
