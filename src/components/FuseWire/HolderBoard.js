import * as React from 'react';
import {View} from 'react-native';
import {constants} from '../../utilities/FuseWire';
const {
  HolderBoardHeight,
  HolderBoardWidth,
  WindowHeight,
  WindowWidth,
  holderComponentRightOffset,
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
const HolderBoard = () => {
  const initialX = WindowWidth - holderComponentRightOffset;
  const verticalCenter = WindowHeight / 2;
  const circleSize = HolderBoardWidth * 0.1;

  return (
    <View
      style={{
        position: 'absolute',
        height: HolderBoardHeight,
        width: HolderBoardWidth,
        left: initialX - HolderBoardWidth / 2,
        top: verticalCenter - HolderBoardHeight / 2,
        justifyContent: 'space-between',
        backgroundColor: '#rgb(42, 154, 130)',
        borderRadius: HolderBoardWidth * 0.1,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          margin: HolderBoardWidth * 0.1,
        }}>
        <Circle size={circleSize} />
        <Circle size={circleSize} />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          margin: HolderBoardWidth * 0.1,
        }}>
        <Circle size={circleSize} />
        <Circle size={circleSize} />
      </View>
    </View>
  );
};

export default HolderBoard;
