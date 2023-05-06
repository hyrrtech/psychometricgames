import {TouchableOpacity} from 'react-native';
import SwitchSvgVertical from './SVG/SwitchSvgVertical';
import SwitchSvgTurn from './SVG/SwitchSvgTurn';
import {useContext} from 'react';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {adjustCoordinates} from '../../utilities/Train of Thoughts';

const Switch = (point, switchSize, id, directions) => {
  const {switchDirections, setSwitchDirections} = useContext(
    TrainOfThoughtsContext,
  );
  const direction = switchDirections[id - 1];
  const handlePress = () => {
    const newSwitchDirections = [...switchDirections];
    direction === directions[0]
      ? (newSwitchDirections[id - 1] = directions[1])
      : (newSwitchDirections[id - 1] = directions[0]);

    setSwitchDirections(() => newSwitchDirections);
  };
  point = adjustCoordinates(point);

  const stepX = point.x;
  const stepY = point.y;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      key={`${stepX}-${stepY}-switch`}
      style={{
        position: 'absolute',
        zIndex: 19,
        left: stepX,
        top: stepY,
        height: switchSize,
        width: switchSize,
      }}>
      {direction === 'vertical' && (
        <SwitchSvgVertical
          height={switchSize}
          width={switchSize}
          rotation={'0deg'}
        />
      )}
      {direction === 'horizontal' && (
        <SwitchSvgVertical
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
        />
      )}
      {direction === 'horizontal_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
        />
      )}
      {direction === 'vertical_left_down' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
        />
      )}
      {direction === 'horizontal_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
        />
      )}
      {direction === 'vertical_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
        />
      )}
      {direction === 'vertical_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'0deg'}
        />
      )}
      {direction === 'horizontal_left_up' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
          scaleX={-1}
        />
      )}
    </TouchableOpacity>
  );
};

export default Switch;
