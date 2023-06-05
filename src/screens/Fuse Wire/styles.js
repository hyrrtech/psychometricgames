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
  icon: {
    marginRight: 0,
    height: 40,
    width: 35,
  },
  tilesBox: {
    borderWidth: 6,
    borderRadius: 5,
    borderColor: 'rgba(0, 48, 73, 0.5)',
    backgroundColor: 'rgba(0, 48, 73, 0.5)',
  },
  row: {flexDirection: 'row'},
});

export default styles;
