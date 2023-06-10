import {View, StyleSheet, Text} from 'react-native';
import {constants} from '../../utilities/Organic Order';
const {PlantPotHeight, PlantPotWidth} = constants;
const PlantPot = ({position, value}) => {
  return (
    <View
      style={[
        styles.dropZone,
        {
          left: position.x - PlantPotWidth / 2,
          top: position.y - PlantPotHeight / 2,
        },
      ]}></View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    position: 'absolute',
    height: PlantPotHeight,
    width: PlantPotWidth,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
  },
});

export default PlantPot;
