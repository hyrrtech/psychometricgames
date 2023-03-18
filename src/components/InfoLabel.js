import {View, Text} from 'react-native';
import {FontStyle} from '../values/Font';
export const InfoLabel = ({label, value, style}) => {
  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}, style]}>
      <Text style={[FontStyle.p, {color: style?.color}]}>{label}</Text>
      {value ? (
        <Text style={[FontStyle.h4, {color: style?.color}]}>{value}</Text>
      ) : null}
    </View>
  );
};
