import {Dimensions} from 'react-native';

const {height: WindowHeight, width: WindowWidth} = Dimensions.get('window');
const FuseHeight = WindowHeight * 0.04;
const FuseWidth = WindowWidth * 0.15;
const FuseHolderHeight = WindowHeight * 0.05;
const FuseHolderWidth = WindowWidth * 0.2;

export default {
  FuseHeight,
  FuseWidth,
  FuseHolderHeight,
  FuseHolderWidth,
  WindowHeight,
  WindowWidth,
};
