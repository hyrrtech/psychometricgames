import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(127, 238, 255,0.2)',

    padding: '5%',

    fontFamily: 'Montaga',
  },
  buttonContainer: {marginVertical: '5%', width: '100%'},

  header: {
    fontSize: 32,
    fontFamily: 'Montaga',
    color: '#2A2740',
  },
  subHeader: {fontSize: 20, fontFamily: 'Montaga', color: '#2A2740'},
  body: {
    fontSize: 16,
    fontFamily: 'Montaga',
    textAlign: 'center',
    color: '#2A2740',
  },
  bodySmall: {
    fontSize: 13,
    fontFamily: 'Montaga',
    textAlign: 'center',
    color: '#2A2740',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
