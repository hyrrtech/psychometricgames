import {StyleSheet} from 'react-native';
import {COLORS} from '../../values/Colors';
import {FontStyle} from '../../values/Font';
const styles = StyleSheet.create({
  helperText1: [
    FontStyle.h4,
    {color: COLORS.textSecondary, marginBottom: '10%'},
  ],
  helperText2: [
    FontStyle.p,
    {
      color: COLORS.textPrimary,
      backgroundColor: 'rgba(255,255,255,0.3)',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
      borderRadius: 10,
      marginTop: '10%',
    },
  ],
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  boxContainer: {
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    aspectRatio: 1.5 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: [FontStyle.h1, {color: 'black'}],

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
