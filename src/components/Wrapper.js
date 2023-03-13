import {StyleSheet, View} from 'react-native';
export const Wrapper = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    justifyContent: 'flex-end',
  },
});
