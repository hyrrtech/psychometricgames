import {View} from 'react-native';
import constants from '../../utilities/Pirate Passage/constants';

const {lineWidth, lineHeight, pirateLineWidth, pirateLineHeight} = constants;

const Line = (point, nextPoint, type, color, offset) => {
  const deltaX = nextPoint.x - point.x;
  const deltaY = nextPoint.y - point.y;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const direction = Math.atan2(deltaY, deltaX);
  const stepSize = type === 'pirateShip' ? pirateLineWidth * 0.5 : lineWidth;
  const numSteps = Math.ceil(distance / stepSize);

  return Array.from({length: numSteps}, (_, i) => {
    const stepX = point.x - offset + (i + 1) * (deltaX / numSteps);
    const stepY = point.y - offset + (i + 1) * (deltaY / numSteps);

    return (
      <View
        pointerEvents="none"
        key={`-${i}`}
        style={[
          {
            position: 'absolute',
            borderRadius: type === 'pirateShip' ? pirateLineWidth / 2 : 0,
            left:
              type === 'pirateShip'
                ? stepX - pirateLineWidth
                : stepX - lineWidth / 2,
            top:
              type === 'pirateShip'
                ? stepY - pirateLineHeight
                : stepY - lineHeight / 2,

            height: type === 'pirateShip' ? pirateLineHeight : lineHeight,
            width: type === 'pirateShip' ? pirateLineWidth : lineWidth,
            backgroundColor:
              type === 'pirateShip'
                ? color
                : i % 2 == 0
                ? color
                : 'transparent',
            transform: [{rotate: `${direction}rad`}],
          },
        ]}
      />
    );
  });
};

export default Line;
