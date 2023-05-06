import React, {useState, useEffect} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg';
import SpiderPath from './SpiderPath';
import KilledSpiderPath from './KilledSpiderPath';

const Spider = ({dimensions, onPress, disabled}) => {
  const [squished, setSquished] = useState(false);

  const handlePress = () => {
    setSquished(true);
    onPress();
    setTimeout(() => {
      setSquished(false);
    }, 200);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      onPress={() => handlePress()}>
      <Svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 3385 3147"
        fill="none"
        onPress={() => handlePress()}>
        {squished ? <KilledSpiderPath /> : <SpiderPath />}
      </Svg>
    </TouchableOpacity>
  );
};

export default Spider;
