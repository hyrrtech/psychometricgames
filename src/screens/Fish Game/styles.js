import {StyleSheet} from 'react-native';
import {COLORS} from '../../values/Colors';
const styles = StyleSheet.create({
  button: {
    color: COLORS.textPrimary,
    backgroundColor: 'rgb(24, 110, 116)',
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  infoLabel: {
    borderColor: 'rgba(84, 214, 234, 1)',
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(84, 214, 234, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '8%',
    paddingVertical: '2%',
  },
  icon: {
    marginRight: 0,
    height: 40,
    width: 35,
  },
});

export default styles;
