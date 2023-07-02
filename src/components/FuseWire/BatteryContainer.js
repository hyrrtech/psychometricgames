import {View, StyleSheet} from 'react-native';
import {constants} from '../../utilities/FuseWire';
import Battery from './SVG/Battery';

const {
  fuseBoardWidth,
  HolderBoardWidth,
  holderComponentRightOffset,
  fuseComponentLeftOffset,
  WindowWidth,
  WindowHeight,
} = constants;

const Circle = ({size}) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: '#07715d',
      }}></View>
  );
};
const Handle = ({height, width}) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: height,
        width: width,
        borderWidth: 4,
        borderColor: '#07715d',
        borderBottomLeftRadius: width * 0.2,
        borderBottomRightRadius: width * 0.2,
        borderTopWidth: 0,
        alignSelf: 'center',
      }}></View>
  );
};

const BatteryContainer = () => {
  const occupiedWidth =
    HolderBoardWidth + fuseBoardWidth + holderComponentRightOffset;
  const containerWidth = WindowWidth - occupiedWidth;
  const containerHeight = WindowHeight * 0.12;
  const verticalCenter = WindowHeight / 2;
  const leftOffset = fuseComponentLeftOffset + fuseBoardWidth;
  const topOffset = verticalCenter - containerHeight / 2;
  const circleSize = containerWidth * 0.08;
  const handleHeight = containerWidth * 0.12;
  const handleWidth = containerWidth * 0.4;
  const batteryContainerHeight = containerHeight * 0.5;
  const batteryContainerWidth = containerWidth * 0.7;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2a9a82',
      width: containerWidth,
      height: containerHeight,
      position: 'absolute',
      left: leftOffset,
      top: topOffset,
      justifyContent: 'space-between',
    },
    row: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      margin: containerWidth * 0.05,
      alignItems: 'flex-start',
    },
    battery: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      height: batteryContainerHeight,
      width: batteryContainerWidth,
      backgroundColor: '#0d8169',
      borderRadius: batteryContainerWidth / 15,
      alignItems: 'center',
      justifyContent: 'center',

      transform: [
        {translateX: -batteryContainerWidth / 2},
        {translateY: -batteryContainerHeight / 2},
      ],
    },
  });

  return (
    <View style={styles.container}>
      <Handle height={handleHeight} width={handleWidth} />
      <View style={styles.row}>
        <Circle size={circleSize} />
        <Circle size={circleSize} />
      </View>
      <View style={styles.row}>
        <Circle size={circleSize} />
        <Circle size={circleSize} />
      </View>
      <Battery
        height={batteryContainerHeight}
        width={batteryContainerWidth}
        styles={styles.battery}
      />
    </View>
  );
};

export default BatteryContainer;
