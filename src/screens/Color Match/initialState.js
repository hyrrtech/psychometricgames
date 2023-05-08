import {newColorSetGenerator} from '../../utilities/Color Match';

export const colors = ['red', 'blue', 'black', 'cyan'];
export const time = {minutes: 2, seconds: 0};
export const timeout = 300;

const initialState = {
  score: 0,
  colorSet: newColorSetGenerator(colors),
};

export default initialState;
