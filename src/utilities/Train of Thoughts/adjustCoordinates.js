import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const adjustCoordinates = point => {
  const scaleX = width / 430;
  const scaleY = height / 950;
  return {
    ...point,
    x: point.x * scaleX,
    y: point.y * scaleY,
  };
};

export default adjustCoordinates;
