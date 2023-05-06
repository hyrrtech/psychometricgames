import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {FontStyle} from '../values/Font';
export const Button = ({title, style, icon, iconProps, ...restProps}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[style, styles.buttonContainer]}
      {...restProps}>
      {icon ? <Image source={icon} style={[styles.icon, iconProps]} /> : null}
      <Text style={[FontStyle.h4, {color: style?.color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 25,
    width: 25,
    marginRight: '3%',
  },
});
