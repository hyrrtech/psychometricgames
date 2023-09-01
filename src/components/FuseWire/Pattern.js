import {View, StyleSheet, Text} from 'react-native';
import {constants} from '../../utilities/FuseWire';
import {FontStyle} from '../../values/Font';
import {useContext} from 'react';
import {FuseWireContext} from '../../providers/FuseWire.Provider';
const {fuseBoardWidth, FuseHolderHeight} = constants;

const Pattern = ({pattern, position}) => {
  const {showPattern} = useContext(FuseWireContext);
  return pattern.length > 0 && showPattern ? (
    <View
      pointerEvents="none"
      style={[styles.container, {top: position.y - FuseHolderHeight / 2}]}>
      <Text style={styles.text}>{pattern}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: FuseHolderHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    right: fuseBoardWidth * 0.5,
  },
  text: {
    ...FontStyle.H3_bold,
    color: 'white',
    marginLeft: '5%',
  },
});

export default Pattern;
