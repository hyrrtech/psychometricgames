import {StyleSheet} from 'react-native';
import {COLORS} from '../../values/Colors';

const styles = StyleSheet.create({
  button: {
    borderColor: COLORS.primary,
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(7, 94, 84, 0.16)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '8%',
    paddingVertical: '2.5%',
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
});

export default styles;
