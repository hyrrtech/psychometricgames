import stateGenerator from '../../utilities/Frog Jump/stateGenerator';
import {constants} from '../../utilities/Frog Jump';
const {NUM_OF_LILLIPADS, MAX_NUM_OF_JUMPS} = constants;

const initialState = stateGenerator(NUM_OF_LILLIPADS);
export {initialState, MAX_NUM_OF_JUMPS};
