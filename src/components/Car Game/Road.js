import {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';

const Road = ({roadHeight, roadWidth, children}) => {
  const {height, width} = Dimensions.get('window');

  return (
    <View
      style={{
        // top: -roadHeight * 0.43,
        width: roadWidth,
        height: roadHeight,
        backgroundColor: 'gray',
        // transform: [{rotateX: '75deg'}],
        borderRightColor: 'white',
        borderRightWidth: width * 0.05,
        borderLeftColor: 'white',
        borderLeftWidth: width * 0.05,
      }}>
      {children}
    </View>
  );
};

export default Road;
