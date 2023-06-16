import {View} from 'react-native';
import {adjustCoordinates, constants} from '../../utilities/Train of Thoughts/';
import StationBackSvg from './SVG/StationBackSvg';
import StationFrontSvg from './SVG/StationFrontSvg';
import StationLeftSvg from './SVG/StationLeftSvg';

const {pathSize, stationSize} = constants;
const Station = (point, prevPoint) => {
  point = adjustCoordinates(point);
  prevPoint = adjustCoordinates(prevPoint);
  const deltaX = point.x - prevPoint.x;
  const deltaY = point.y - prevPoint.y;
  let direction = Math.ceil((Math.atan2(deltaY, deltaX) * 180) / Math.PI);
  let stepX = point.x;
  let stepY = point.y;
  // adjust offset here too
  // if (direction === 0) {
  //   direction = 90;
  // } else if (direction === -90) {
  //   direction = 0;
  // } else if (direction === 90) {
  //   direction = 0;
  // } else if (direction === -177) {
  //   direction = -90;
  // } else if (direction === 180) {
  //   direction = -90;
  // }
  if (direction === -90) {
    stepX = stepX - pathSize / 2;
  }
  if (direction === 0 || direction < -90 || direction === 180) {
    stepX = stepX - pathSize;
    stepY = stepY - pathSize;
  }
  if (direction === 90) {
    stepX = stepX - pathSize / 2;
    stepY = stepY - pathSize;
  }

  return (
    <View
      key={`${stepX}-${stepY}-destination`}
      style={{
        position: 'absolute',
        zIndex: 999,
        left: stepX,
        top: stepY,
      }}>
      {direction === -90 && (
        <StationFrontSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
      {(direction === 0 || direction < -90 || direction === 180) && (
        <StationLeftSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
      {direction === 90 && (
        <StationBackSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
    </View>
  );
};
export default Station;
