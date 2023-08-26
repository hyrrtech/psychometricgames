import {TouchableOpacity, Text} from 'react-native';
import SwitchSvgVertical from './SVG/SwitchSvgVertical';
import SwitchSvgTurn from './SVG/SwitchSvgTurn';
import {useContext} from 'react';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {adjustCoordinates, constants} from '../../utilities/Train of Thoughts';
const {switchSize} = constants;
const Switch = (point, id, directions) => {
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
      disabled={directions.length === 1}
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
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'horizontal' && (
        <SwitchSvgVertical
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'horizontal_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'vertical_left_down' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'horizontal_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'vertical_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'vertical_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'0deg'}
          showOnlyTrack={directions.length === 1}
        />
      )}
      {direction === 'horizontal_left_up' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
          scaleX={-1}
          showOnlyTrack={directions.length === 1}
        />
      )}
    </TouchableOpacity>
  );
};

export default Switch;
