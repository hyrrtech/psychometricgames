import {View, StyleSheet} from 'react-native';
import {constants} from '../../utilities/FuseWire';
const {FuseHolderHeight, FuseHolderWidth} = constants;
const FuseHolder = ({position}) => {
  return (
    <View
      style={[
        styles.dropZone,
        {
          left: position.x - FuseHolderWidth / 2,
          top: position.y - FuseHolderHeight / 2,
        },
      ]}></View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    position: 'absolute',
    height: FuseHolderHeight,
    width: FuseHolderWidth,
    backgroundColor: '#2c3e50',
  },
});

export default FuseHolder;
