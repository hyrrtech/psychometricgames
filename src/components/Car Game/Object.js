import {View} from 'react-native';
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
        width: '100%',
        alignItems: align,
        height: obstacleHeight,
        position: 'absolute',
      }}>
      <View
        style={{
          height: '100%',
          width: obstacleWidth,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}></View>
    </View>
  );
};

export default Obstacle;
