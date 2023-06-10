import {View, StyleSheet, Text} from 'react-native';
import {constants} from '../../utilities/FuseWire';
const {FuseHolderHeight, FuseHolderWidth} = constants;
const FuseHolder = ({position, value, initiallyBlank}) => {
  return (
    <View
      style={[
        styles.dropZone,
        {
          left: position.x - FuseHolderWidth / 2,
          top: position.y - FuseHolderHeight / 2,
        },
      ]}>
      <Text style={styles.text}>{initiallyBlank ? '' : value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    position: 'absolute',
    height: FuseHolderHeight,
    width: FuseHolderWidth,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
  },
});

export default FuseHolder;
