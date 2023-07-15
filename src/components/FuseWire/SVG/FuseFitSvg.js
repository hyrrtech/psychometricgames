import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View, Text} from 'react-native';
const FuseFitSvg = ({height, width, value, color}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Svg width={width} height={height} viewBox="0 0 72 61" fill="none">
      <Path
        d="M6.66998 59.84L64.69 59.84C67.8214 59.84 70.36 57.3015 70.36 54.17V31.67C70.36 28.5386 67.8214 26 64.69 26L6.66998 26C3.53853 26 0.999985 28.5386 0.999985 31.67V54.17C0.999985 57.3015 3.53853 59.84 6.66998 59.84Z"
        fill="#028762"
        stroke="rgb(28, 189, 145)"
        strokeWidth={1}
      />
      <Path
        d="M6.67163 1H64.6884C66.1926 1 67.6352 1.59737 68.6988 2.66071C69.7625 3.72404 70.36 5.16623 70.36 6.67001V50.06H1V6.67001C1 5.16623 1.59755 3.72404 2.66118 2.66071C3.72482 1.59737 5.16742 1 6.67163 1Z"
        fill="#028762"
        stroke="rgb(28, 189, 145)"
        strokeWidth={1}
      />
      <Path d="M70.36 8H1V50.3H70.36V8Z" fill="#48d8a3" />
    </Svg>
    <Text style={{position: 'absolute', textAlign: 'center'}}>{value}</Text>
  </View>
);
export default FuseFitSvg;
