import {Dimensions} from 'react-native';
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const ratio = windowHeight / windowWidth / 3;
const barrierWidth = windowWidth;
const barrierHeight = windowHeight * 0.333;
const barrierX = 0;
const barrierY = windowHeight * 0.333;
export default {
  ratio,
  windowHeight,
  windowWidth,
  barrierWidth,
  barrierHeight,
  barrierX,
  barrierY,
};
