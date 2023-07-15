import * as React from 'react';
import {View} from 'react-native';
import {constants} from '../../utilities/FuseWire';
const {
  HolderBoardHeight,
  WindowHeight,
  fuseComponentLeftOffset,
  FuseWidth,
  horizontal_gap,
  fuseBoardWidth,
} = constants;

const HolderBoard = () => {
  const initialX = fuseComponentLeftOffset;
  const centerX = initialX + 0.5 * (FuseWidth + horizontal_gap) + FuseWidth / 2;

  const verticalCenter = WindowHeight / 2;
  const offsetHeight = fuseBoardWidth * 0.05;

  return (
    <View
      style={{
        position: 'absolute',
        height: HolderBoardHeight,
        width: fuseBoardWidth,
        left: centerX - fuseBoardWidth / 2,
        top: verticalCenter - HolderBoardHeight / 2,
        justifyContent: 'flex-start',
        backgroundColor: '#057b65',
        borderColor: '#1b8771',
        borderWidth: 5,
      }}>
      <View
        style={{
          width: '100%',
          height: offsetHeight,
          backgroundColor: '#07715d',
        }}></View>
    </View>
  );
};

export default HolderBoard;
