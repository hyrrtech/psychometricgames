import {useRef, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import {FontStyle} from '../values/Font';
export const InfoLabel = ({label, value, style, showAnimation}) => {
  const textScale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(textScale, {
        toValue: 1.15,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showAnimation && value]);

  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}, style]}>
      <Text style={[FontStyle.p, {color: style?.color}]}>{label}</Text>
      {value ? (
        <Animated.Text
          style={[
            FontStyle.h4,
            {color: style?.color},
            {transform: [{scale: textScale}]},
          ]}>
          {value}
        </Animated.Text>
      ) : null}
    </View>
  );
};
