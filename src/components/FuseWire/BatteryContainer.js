import {View} from 'react-native';
import {constants} from '../../utilities/FuseWire';

const {
  fuseBoardWidth,
  HolderBoardWidth,
  holderComponentRightOffset,
  fuseComponentLeftOffset,
  WindowWidth,
  WindowHeight,
} = constants;

const BatteryContainer = () => {
  const occupiedWidth =
    HolderBoardWidth + fuseBoardWidth + holderComponentRightOffset;

  const containerWidth = WindowWidth - occupiedWidth;
  const containerHeight = WindowHeight * 0.12;
  const verticalCenter = WindowHeight / 2;
  const leftOffset = fuseComponentLeftOffset + fuseBoardWidth;
  const topOffset = verticalCenter - containerHeight / 2;

  return (
    <View
      style={{
        backgroundColor: '#2a9a82',
        width: containerWidth,
        height: containerHeight,
        position: 'absolute',
        left: leftOffset,
        top: topOffset,
      }}
    />
  );
};

export default BatteryContainer;
