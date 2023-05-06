import {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';

const Road = ({roadHeight, roadWidth, roadLineWidth, children}) => {
  return (
    <View
      style={{
        marginLeft: '0%',
        top: -roadHeight * 0.43,
        width: roadWidth,
        height: roadHeight,
        backgroundColor: '#ce9048',
        // transform: [{rotateX: '86.6deg'}],
        borderRightColor: '#916027',
        borderRightWidth: roadWidth * 0.07,
        borderLeftColor: '#916027',
        borderLeftWidth: roadWidth * 0.07,
        overflow: 'hidden',
      }}>
      {children}
      <View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: roadHeight,
        }}>
        <View
          style={{
            height: '100%',
            width: roadLineWidth,
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        />
        <View
          style={{
            height: '100%',
            width: roadLineWidth,
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        />
      </View>
    </View>
  );
};

export default Road;
