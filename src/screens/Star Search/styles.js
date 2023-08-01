import {StyleSheet} from 'react-native';
import {COLORS} from '../../values/Colors';
const styles = StyleSheet.create({
  infoLabel: {
    borderColor: 'rgba(84, 214, 234, 1)',
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(84, 214, 234, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '8%',
    paddingVertical: '2%',
  },
  button: {
    color: COLORS.textPrimary,
    backgroundColor: 'rgb(24, 110, 116)',
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
});

export default styles;
