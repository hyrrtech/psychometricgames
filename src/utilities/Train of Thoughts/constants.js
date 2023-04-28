import {Dimensions} from 'react-native';

export const {width} = Dimensions.get('window');
export const trainSize = width * 0.1;
export const pathSize = width * 0.06;
export const curveSize = pathSize + 5;
export const switchSize = width * 0.12;
export const stationSize = width * 0.18;
export const speed = 50;
export const initialSpawnSpeed = 4000;
export const time = {minutes: 1, seconds: 0};

export const originalSwitchDirections = {
  1: ['horizontal_left', 'horizontal'],
  2: ['horizontal', 'horizontal_right'],
  3: ['vertical_left_down', 'vertical'],
  4: ['horizontal', 'horizontal_left'],
  5: ['vertical_left_down', 'vertical'],
  6: ['vertical', 'vertical_right'],
  7: ['horizontal', 'horizontal_left_up'],
  8: ['vertical_right', 'vertical'],
  9: ['vertical_right', 'vertical'],
  10: ['vertical_left', 'vertical'],
  11: ['horizontal_left', 'horizontal'],
  12: ['vertical', 'vertical_left'],
  13: ['horizontal_right', 'horizontal'],
};

export const switchDirectionArray = Object.values(originalSwitchDirections).map(
  switchDirection => switchDirection[0],
);
