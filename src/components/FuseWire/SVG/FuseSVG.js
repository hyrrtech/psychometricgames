import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const FuseSvg = ({height, width, showPlugs}) => {
  // console.log('showPlugs', showPlugs);
  return (
    <Svg width={width} height={height} viewBox="0 0 72 61" fill="none">
      <Path
        d="M6.67 2H64.67C66.1738 2 67.616 2.59737 68.6793 3.66071C69.7426 4.72404 70.34 6.16623 70.34 7.67001V51.06H1V7.67001C1 6.16623 1.59737 4.72404 2.66071 3.66071C3.72404 2.59737 5.16622 2 6.67 2Z"
        fill="#ed8524"
        stroke="#feac1c"
      />
      {showPlugs && (
        <Path d="M28.08 51.06H12.85V61.21H28.08V51.06Z" fill="#ed8524" />
      )}
      {showPlugs && (
        <Path d="M56.84 51.06H41.61V61.21H56.84V51.06Z" fill="#ed8524" />
      )}
      <Path d="M70.36 8.76999H1V51.07H70.36V8.76999Z" fill="#fecb0e" />
    </Svg>
  );
};
export default FuseSvg;
