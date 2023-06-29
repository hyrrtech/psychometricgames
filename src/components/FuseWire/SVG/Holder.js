import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
const HolderSvg = ({height, width}) => (
  <Svg width={width} height={height} viewBox="0 0 47 25" fill="none">
    <Path
      d="M5.38845 0.0126953H41.6629C44.318 0.0126953 46.4748 1.37934 46.4748 3.06172V21.1619C46.4748 22.8443 44.318 24.2109 41.6629 24.2109H5.38845C2.73336 24.2109 0.576538 22.8443 0.576538 21.1619V3.06172C0.576538 1.37934 2.73336 0.0126953 5.38845 0.0126953Z"
      fill="white"
    />
    <Path
      d="M41.6558 0.991821H5.38849C4.31918 0.991821 3.45233 1.52543 3.45233 2.18367V19.7634C3.45233 20.4216 4.31918 20.9552 5.38849 20.9552H41.6558C42.7251 20.9552 43.592 20.4216 43.592 19.7634V2.18367C43.592 1.52543 42.7251 0.991821 41.6558 0.991821Z"
      fill="#EE5702"
    />
    <Path
      d="M3.96484 20.5093V2.71915C3.96484 2.05418 4.83327 1.51334 5.901 1.51334H42.1754C42.7378 1.51334 43.236 1.66407 43.5848 1.89902C43.5208 1.26952 42.6879 0.77301 41.6629 0.77301H5.38849C4.32075 0.77301 3.45233 1.31385 3.45233 1.97882V19.769C3.45233 20.0837 3.65164 20.3719 3.97196 20.5847C3.97196 20.5581 3.95772 20.5315 3.95772 20.5049L3.96484 20.5093Z"
      fill="#B34507"
    />
    <Rect
      x={11.0667}
      y={9.61981}
      width={7.80928}
      height={3.42166}
      rx={1}
      fill="white"
    />
    <Rect
      x={28.09}
      y={9.61981}
      width={7.80928}
      height={3.42166}
      rx={1}
      fill="white"
    />
  </Svg>
);
export default HolderSvg;
