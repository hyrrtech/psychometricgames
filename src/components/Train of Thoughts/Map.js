import {renderMap, path} from '../../utilities/Train of Thoughts/';

const Map = () => {
  return [...renderMap(path.switch)];
};

export default Map;
