import {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';

const Road = ({roadHeight, roadWidth, children}) => {
  const {height, width} = Dimensions.get('window');

  return (
    <View
      style={{
        // top: -roadHeight * 0.33,
        width: roadWidth,
        height: roadHeight,
        backgroundColor: 'gray',
        // transform: [{rotateX: '60deg'}],
      }}>
      {children}
    </View>
  );
};

export default Road;
