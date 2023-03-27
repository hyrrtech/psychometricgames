import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import Svg, {Path, Ellipse, G, Circle} from 'react-native-svg';
const AnimatedG = Animated.createAnimatedComponent(G);

const InflatingBalloon = props => {
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const transform = [
    {
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15],
      }),
    },
    {
      rotate: position.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-0.5deg', '-1deg', '0.5deg'],
      }),
    },
  ];

  return (
    <AnimatedG
      style={{
        transform: transform,
      }}>
      <Path
        d="M142.783 216.04C142.481 214.376 144.74 212.419 148.85 212.359C150.205 212.543 153.022 212.202 153.459 209.373"
        stroke="#6C6C6C"
      />
      <Path
        d="M138.434 208.146C138.15 206.513 139.005 204.894 140.514 204.208C142.19 203.446 144.172 204.056 145.129 205.629L150.091 213.78C150.33 214.174 150.519 214.596 150.653 215.037L151.29 217.143C152.114 219.863 150.692 222.757 148.036 223.767C145.08 224.891 141.794 223.25 140.916 220.212L139.952 216.873L138.434 208.146Z"
        fill="#f81010"
      />
      <Ellipse
        cx={147.139}
        cy={220.347}
        rx={3.5}
        ry={5.13608}
        transform="rotate(50.2678 147.139 220.347)"
        fill="#ab0e0e"
      />
      <Path
        d="M140.45 215.335C140.45 215.335 132.361 244.373 137.452 265.373C142.543 286.373 153.952 294.373 151.452 314.873C148.952 335.373 150.45 348.335 150.45 348.335"
        stroke="#6C6C6C"
      />
      <Path
        d="M140.452 215.873C140.452 213.873 143.752 212.073 148.952 212.873C150.618 213.373 154.252 213.573 155.452 210.373"
        stroke="#6C6C6C"
      />
      <Circle cx={143.5} cy={113.5} r={98.5} fill="#f81010" />
      <Ellipse
        cx={88.0083}
        cy={67.7771}
        rx={11.5}
        ry={25.5}
        transform="rotate(31.0628 88.0083 67.7771)"
        fill="white"
        fillOpacity={0.29}
      />
    </AnimatedG>
  );
};

export default InflatingBalloon;
