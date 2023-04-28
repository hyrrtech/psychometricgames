import {Switch, Station, Track} from '../../components/Train of Thoughts/';

import {originalSwitchDirections} from '../../utilities/Train of Thoughts/constants';

const renderMap = switchObj => {
  let elements = [];
  let id = switchObj.id;
  let direction0 = originalSwitchDirections[id][0];
  let direction1 = originalSwitchDirections[id][1];
  let path0 = switchObj[direction0];
  let path1 = switchObj[direction1];
  elements.push(
    Switch({x: switchObj.x, y: switchObj.y}, id, [direction0, direction1]),
  );
  elements.push(Track(path0.path));
  elements.push(Track(path1.path));
  if (path0.switch) {
    elements.push(...renderMap(path0.switch));
  }
  if (path1.switch) {
    elements.push(...renderMap(path1.switch));
  }
  if (path0.destination) {
    elements.push(Station(path0.destination, {x: switchObj.x, y: switchObj.y}));
  }
  if (path1.destination) {
    elements.push(Station(path1.destination, {x: switchObj.x, y: switchObj.y}));
  }
  return elements;
};

export default renderMap;
