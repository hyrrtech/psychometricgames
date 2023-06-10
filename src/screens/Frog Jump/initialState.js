import stateGenerator from '../../utilities/Frog Jump/stateGenerator';

const MAX_NUM_OF_JUMPS = 40;
const NUM_OF_LILLIPADS = 10;

const initialState = stateGenerator(NUM_OF_LILLIPADS);
export {initialState, MAX_NUM_OF_JUMPS};
