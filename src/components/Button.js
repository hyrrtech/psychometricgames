import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {GlobalStyles} from '../styles/GlobalStyles';

export const Button = props => {
  const {title, style, color, icon, ...restProps} = props;

  return (
    <TouchableOpacity style={[style, styles.buttonContainer]} {...restProps}>
      {icon ? <Image source={icon} style={styles.icon} /> : null}
      <Text style={[GlobalStyles.subHeader, color ? {color: color} : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginVertical: '2%',
    paddingVertical: '5%',
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
