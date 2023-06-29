import {View, StyleSheet, Text} from 'react-native';
import {constants} from '../../utilities/FuseWire';
import HolderSvg from './SVG/Holder';
import FuseFitSvg from './SVG/FuseFitSvg';
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
      {initiallyBlank ? (
        <HolderSvg height={FuseHolderHeight} width={FuseHolderWidth} />
      ) : (
        <FuseFitSvg
          height={FuseHolderHeight}
          width={FuseHolderWidth}
          color={'green'}
        />
      )}
      <Text style={styles.text}>{initiallyBlank ? '' : value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    position: 'absolute',

    // backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    position: 'absolute',
    textAlign: 'center',
  },
});

export default FuseHolder;
