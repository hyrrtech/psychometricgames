import {Dimensions} from 'react-native';

const {height: WindowHeight, width: WindowWidth} = Dimensions.get('window');

const PlantPotHeight = WindowHeight * 0.09;
const PlantPotWidth = WindowWidth * 0.14;
const SeedPacketHeight = WindowHeight * 0.11;
const SeedPacketWidth = WindowWidth * 0.15;

export default {
  SeedPacketHeight,
  SeedPacketWidth,
  PlantPotHeight,
  PlantPotWidth,
  WindowHeight,
  WindowWidth,
};
