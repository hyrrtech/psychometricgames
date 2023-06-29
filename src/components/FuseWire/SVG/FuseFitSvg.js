import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View, Text} from 'react-native';
const FuseFitSvg = ({height, width, value, color}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Svg width={width} height={height} viewBox="0 0 47 39" fill="none">
      <Path
        d="M5.38845 0.91803H41.6629C44.318 0.91803 46.4748 3.03584 46.4748 5.64292V33.6917C46.4748 36.2988 44.318 38.4166 41.6629 38.4166H5.38845C2.73336 38.4166 0.576538 36.2988 0.576538 33.6917V5.64292C0.576538 3.03584 2.73336 0.91803 5.38845 0.91803Z"
        fill="white"
      />
      <Path
        d="M41.6558 2.4353H5.38843C4.31912 2.4353 3.45227 3.2622 3.45227 4.28224V31.5245C3.45227 32.5445 4.31912 33.3714 5.38843 33.3714H41.6558C42.7251 33.3714 43.5919 32.5445 43.5919 31.5245V4.28224C43.5919 3.2622 42.7251 2.4353 41.6558 2.4353Z"
        fill={color}
      />
      <Path
        d="M3.96478 32.6804V5.11213C3.96478 4.08167 4.83321 3.24356 5.90094 3.24356H42.1754C42.7377 3.24356 43.236 3.47713 43.5848 3.84123C43.5207 2.86573 42.6879 2.09631 41.6629 2.09631H5.38843C4.32069 2.09631 3.45227 2.93442 3.45227 3.96489V31.5332C3.45227 32.021 3.65158 32.4675 3.9719 32.7972C3.9719 32.756 3.95766 32.7148 3.95766 32.6736L3.96478 32.6804Z"
        fill={color}
      />
    </Svg>
    <Text style={{position: 'absolute', textAlign: 'center'}}>{value}</Text>
  </View>
);
export default FuseFitSvg;
