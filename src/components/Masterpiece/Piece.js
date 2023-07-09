import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {constants} from '../../utilities/Masterpiece';
const {ratio} = constants;

const Piece = ({pathD, viewBox, initialPosition, id}) => {
  const {x, y, width, height} = viewBox;
  console.log(initialPosition, id);
  return (
    <View
      style={{
        borderColor: 'red',
        borderWidth: 1,
        position: 'absolute',
        left: initialPosition.x - (width * ratio) / 2,
        top: initialPosition.y - (height * ratio) / 2,
      }}>
      <Svg
        width={width * ratio}
        height={height * ratio}
        viewBox={`${x} ${y} ${width} ${height}`}>
        <Path d={pathD} fill="#4C4ACF" />
      </Svg>
      <Text style={{color: 'white', position: 'absolute'}}>{id}</Text>
    </View>
  );
};

export default Piece;
