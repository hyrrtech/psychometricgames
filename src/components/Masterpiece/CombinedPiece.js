import Svg, {Path} from 'react-native-svg';
import {viewBoxUtils, constants} from '../../utilities/Masterpiece';
const {ratio} = constants;
const CombinedPiece = ({
  viewBox,
  fill,
  paths,
  stroke,
  strokeWidth,
  position,
  dimensions,
}) => {
  const {width, height} = dimensions;
  return (
    <Svg
      width={width * ratio}
      height={height * ratio}
      viewBox={viewBox}
      fill="none"
      style={{
        position: 'absolute',
        left: position.x - (width * ratio) / 2,
        top: position.y - (height * ratio) / 2,
      }}>
      {paths.map(path => (
        <Path d={path.path} fill={'red'} key={path.path} />
      ))}
    </Svg>
  );
};

export default CombinedPiece;
