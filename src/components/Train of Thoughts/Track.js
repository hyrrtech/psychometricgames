import TrackSvg from './SVG/TrackSvg';
import {View} from 'react-native';
import {adjustCoordinates, constants} from '../../utilities/Train of Thoughts';

const Track = path => {
  const {pathSize} = constants;
  //renders a segment of track
  const track = path.map((point, index) => {
    if (index === path.length - 1) {
      return null; // Skip last point
    }
    point = adjustCoordinates(point);
    const nextPoint = adjustCoordinates(path[index + 1]);

    const deltaX = nextPoint.x - point.x;
    const deltaY = nextPoint.y - point.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const direction = Math.atan2(deltaY, deltaX);
    const stepSize = pathSize;
    const numSteps = Math.ceil(distance / stepSize);

    return Array.from({length: numSteps}, (_, i) => {
      const stepX = point.x + (i + 1) * (deltaX / numSteps);
      const stepY = point.y + (i + 1) * (deltaY / numSteps);

      return (
        <View
          key={`${index}-${i}-track`}
          style={[
            {
              position: 'absolute',
              left: stepX,
              top: stepY,
              transform: [{rotate: `${direction}rad`}],
            },
          ]}>
          <TrackSvg height={pathSize} width={pathSize} />
        </View>
      );
    });
  });
  return track;
};
export default Track;
