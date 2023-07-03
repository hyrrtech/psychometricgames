import {Dimensions} from 'react-native';

const {height: WindowHeight, width: WindowWidth} = Dimensions.get('window');
const FuseHeight = WindowHeight * 0.055;
const FuseWidth = WindowWidth * 0.15;
const FuseHolderHeight = WindowHeight * 0.055;
const FuseHolderWidth = WindowWidth * 0.15;
const HolderBoardHeight = WindowHeight * 0.6;
const HolderBoardWidth = WindowWidth * 0.17;
const holderComponentRightOffset = WindowWidth * 0.1;
const fuseComponentLeftOffset = WindowWidth * 0.06;
const horizontal_gap = WindowWidth * 0.05;
const vertical_gap = WindowHeight * 0.03;
const fuseBoardWidth = 2.5 * FuseWidth + horizontal_gap;
const lives = 5;

export default {
  FuseHeight,
  FuseWidth,
  FuseHolderHeight,
  FuseHolderWidth,
  WindowHeight,
  WindowWidth,
  HolderBoardHeight,
  HolderBoardWidth,
  holderComponentRightOffset,
  fuseComponentLeftOffset,
  horizontal_gap,
  vertical_gap,
  fuseBoardWidth,
  lives,
};
