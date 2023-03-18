import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(127, 238, 255,0.2)',
    padding: '5%',
  },

  buttonContainer: {marginVertical: '5%', width: '100%'},

  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    justifyContent: 'flex-end',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
