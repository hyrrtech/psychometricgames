import {newColorSetGenerator} from '../../utilities/Color Match';

export const colors = [
  {name: 'red', value: '#ff1000'},
  {name: 'blue', value: '#2c7bed'},
  {name: 'yellow', value: '#f6be1b'},
  {name: 'black', value: '#000000'},
  {name: 'orange', value: '#fc792d'},
];
export const time = {minutes: 0, seconds: 30};
export const timeout = 300;

const initialState = {
  score: 0,
  correct: 0,
  incorrect: 0,
  total_rounds_played: 0,
  colorSet: newColorSetGenerator(colors),
};

export default initialState;
