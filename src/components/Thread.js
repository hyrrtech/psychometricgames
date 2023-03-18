import * as React from 'react';
import Svg, {Path, Ellipse} from 'react-native-svg';

const SVGComponent = props => {
  let {windowWidth, windowHeight} = props;

  return (
    <Svg
      width={windowWidth}
      height={300}
      viewBox={`-${windowWidth / 7} ${windowHeight / 5.5} ${windowWidth} ${
        windowHeight / 1.3
      }`}
      style={{backgroundColor: 'gray'}}
      fill="none">
      <Path
        d="M122.832 262.668C122.529 261.004 124.789 259.046 128.899 258.986C130.253 259.17 133.07 258.83 133.507 256"
        stroke="#565656"
      />
      <Path
        d="M118.482 254.773C118.198 253.14 119.053 251.521 120.562 250.835V250.835C122.239 250.073 124.22 250.683 125.178 252.257L130.139 260.407C130.379 260.801 130.568 261.223 130.701 261.664L131.339 263.77C132.163 266.49 130.741 269.384 128.084 270.394V270.394C125.128 271.518 121.842 269.878 120.965 266.839L120 263.5L118.482 254.773Z"
        fill="#FF3232"
      />
      <Ellipse
        cx={127.187}
        cy={266.975}
        rx={3.5}
        ry={5.13608}
        transform="rotate(50.2678 127.187 266.975)"
        fill="#B20000"
      />
      <Path
        d="M120.499 261.962C120.499 261.962 112.064 286.417 117.5 312C122.935 337.583 138.308 348.5 132.654 380C127 411.5 134.5 446.5 134.5 446.5"
        stroke="#565656"
      />
      <Path
        d="M120.5 262.5C120.5 260.5 123.8 258.7 129 259.5C130.667 260 134.3 260.2 135.5 257"
        stroke="#565656"
      />
    </Svg>
  );
};
export default SVGComponent;
