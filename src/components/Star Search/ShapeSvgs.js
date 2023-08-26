import Shape1 from '../../assets/shapes/shape1.svg';
import Shape2 from '../../assets/shapes/shape2.svg';
import Shape3 from '../../assets/shapes/shape3.svg';
import Shape4 from '../../assets/shapes/shape4.svg';
import Shape5 from '../../assets/shapes/shape5.svg';
import Shape6 from '../../assets/shapes/shape6.svg';
import Shape7 from '../../assets/shapes/shape7.svg';

const shapeComponents = {
  shape1: Shape1,
  shape2: Shape2,
  shape3: Shape3,
  shape4: Shape4,
  shape5: Shape5,
  shape6: Shape6,
  shape7: Shape7,
};

import {constants} from '../../utilities/Star Search';
const {shapeSize} = constants;
const ShapeSvg = ({shapeName, darkenColor, lightenColor, patternColor}) => {
  const ShapeComponent = shapeComponents[shapeName];

  return (
    <ShapeComponent
      width={shapeSize}
      height={shapeSize}
      patternColor={patternColor}
      lightenColor={lightenColor}
      darkenColor={darkenColor}
    />
  );
};

export default ShapeSvg;
