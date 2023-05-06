import {View} from 'react-native';
import {adjustCoordinates} from '../../utilities/Train of Thoughts/';
import StationSvg from './SVG/StationSvg';
import {useContext} from 'react';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';

const Station = (point, prevPoint, stationSize) => {
  const pathSize = useContext(TrainOfThoughtsContext).pathSize;
  point = adjustCoordinates(point);
  prevPoint = adjustCoordinates(prevPoint);
  const deltaX = point.x - prevPoint.x;
  const deltaY = point.y - prevPoint.y;
  let direction = Math.ceil((Math.atan2(deltaY, deltaX) * 180) / Math.PI);

  //adjust offset here too
  // if (direction === 0) {
  //   direction = 90;
  // } else if (direction === -90) {
  //   direction = 0;
  // } else if (direction === 90) {
  //   direction = 180;
  // } else if (direction === -177) {
  //   direction = -90;
  // } else if (direction === 180) {
  //   direction = -90;
  // }
  const stepX = point.x;
  const stepY = point.y - pathSize / 2;
  return (
    <View
      key={`${stepX}-${stepY}-destination`}
      style={{
        zIndex: 100,
        position: 'absolute',
        left: stepX,
        top: stepY,
        // transform: [{rotate: `${direction}deg`}],
      }}>
      <StationSvg
        height={stationSize}
        width={stationSize}
        color={point.color}
      />
    </View>
  );
};
export default Station;
