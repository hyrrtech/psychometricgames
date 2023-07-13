import {Dimensions} from 'react-native';
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const angles = [0, 30, 60, 90, 120, 150];
const ratio = windowHeight / windowWidth / 2;
const combinedPiecePosition = {x: windowWidth / 2, y: windowHeight / 2};
const barrierWidth = windowWidth;
const barrierHeight = windowHeight * 0.7;
const barrierX = 0;
const barrierY = windowHeight * 0.15;
export default {
  angles,
  ratio,
  windowHeight,
  windowWidth,
  barrierWidth,
  barrierHeight,
  barrierX,
  barrierY,
  combinedPiecePosition,
};
