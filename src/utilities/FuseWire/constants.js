import {Dimensions} from 'react-native';

const {height: WindowHeight, width: WindowWidth} = Dimensions.get('window');
const FuseHeight = WindowHeight * 0.08;
const FuseHeightUnPlugged = WindowHeight * 0.09;
const FuseWidth = WindowWidth * 0.18;
// const FuseHolderHeight = WindowHeight * 0.05;
// const FuseHolderWidth = WindowWidth * 0.2;
const FuseHolderHeight = WindowHeight * 0.07;
const FuseHolderWidth = WindowWidth * 0.18;

export default {
  FuseHeight,
  FuseHeightUnPlugged,
  FuseWidth,
  FuseHolderHeight,
  FuseHolderWidth,
  WindowHeight,
  WindowWidth,
};
