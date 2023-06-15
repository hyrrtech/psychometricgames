import {View} from 'react-native';
import {adjustCoordinates, constants} from '../../utilities/Train of Thoughts/';
import CurveSVG from './SVG/CurveSVG';
import Track from './Track';
import {renderMap, path} from '../../utilities/Train of Thoughts/';

const Map = () => {
  // const curveCoordinates = adjustCoordinates({x: 370 + 15, y: 625.7});
  // const {curveSize} = constants;
  return [
    // Track([
    //   {x: 375 + 15, y: 850},
    //   {x: 375 + 15, y: 650},
    // ]),
    // <View
    //   style={{
    //     position: 'absolute',
    //     left: curveCoordinates.x,
    //     top: curveCoordinates.y,
    //   }}
    //   key="curve">
    //   <CurveSVG height={curveSize} width={curveSize} />
    // </View>,
    // Track([
    //   {x: 375 + 15, y: 625},
    //   {x: 300 + 15, y: 625},
    // ]),
    ...renderMap(path.switch),
    ,
  ];
};

export default Map;
