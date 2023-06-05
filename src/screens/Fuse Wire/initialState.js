import {stateGenerator} from '../../utilities/FuseWire';

const lives = 5;
const initialState = {...stateGenerator(1), lives: lives};

export default initialState;
