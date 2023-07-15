import {newColorSetGenerator, constants} from '../../utilities/Color Match';
const {colors, time} = constants;

const initialState = {
  score: 0,
  time: time,
  roundsResult: [],
  colorSet: newColorSetGenerator(colors),
};

export default initialState;
