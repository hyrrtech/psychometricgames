import {constants} from '../../utilities/FuseWire';
const {lives} = constants;
const initialState = {
  level: 1,
  lives: lives,
  fuseHolders: [],
  blankValues: [],
  fuse: [],
  startTime: Date.now(),
  valueTimeArray: [],
};

export default initialState;
