import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
const Obstacle = ({positionHorizontal, obstacleHeight, obstacleWidth}) => {
  //check positon horizontal for left center or right
  const align =
    positionHorizontal === 'left'
      ? 'flex-start'
      : positionHorizontal === 'right'
      ? 'flex-end'
      : 'center';

  return (
    <View
      style={{
        alignItems: align,
        position: 'absolute',
        height: obstacleHeight,
        width: obstacleWidth,
        transform: [{rotateX: '0deg'}],
      }}>
      <Svg
        width={obstacleWidth}
        height={obstacleHeight}
        viewBox="0 0 441 198"
        fill="none">
        <Path
          d="M41 134.63C102.277 153.934 166.312 163.025 230.54 161.54C285.744 160.221 340.483 151.097 393.13 134.44C389.75 116.9 381.82 90.05 361.52 64.44C311 0.790005 228.79 1 216.94 1.2C205.83 0.610001 130.67 -2.13 79.19 55.4C52.67 85 44.08 117.64 41 134.63Z"
          fill="#8E6E48"
        />
        <Path
          d="M285 185.71C312.133 194.261 340.489 198.288 368.93 197.63C393.376 197.049 417.617 193.009 440.93 185.63C438.82 174.322 434.018 163.689 426.93 154.63C404.6 126.44 368.18 126.53 362.93 126.63C358.01 126.37 324.73 125.15 301.93 150.63C293.181 160.553 287.325 172.687 285 185.71Z"
          fill="#8E6E48"
        />
        <Path
          d="M0 171.8C27.134 180.347 55.4894 184.371 83.93 183.71C108.376 183.129 132.617 179.089 155.93 171.71C153.816 160.404 149.015 149.771 141.93 140.71C119.6 112.53 83.18 112.62 77.93 112.71C73.01 112.45 39.73 111.24 16.93 136.71C8.17864 146.635 2.32218 158.773 0 171.8Z"
          fill="#8E6E48"
        />
      </Svg>
    </View>
  );
};

export default Obstacle;
