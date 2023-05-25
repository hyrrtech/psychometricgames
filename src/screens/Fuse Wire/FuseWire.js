import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  PanResponder,
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {constants, getFusePositions} from '../../utilities/FuseWire';
import {FuseWireContext} from '../../providers/FuseWire.Provider';

import FuseHolder from '../../components/FuseWire/FuseHolder';
import Fuse from '../../components/FuseWire/Fuse';
const {FuseHeight, FuseWidth, FuseHolderHeight, FuseHolderWidth} = constants;

function generateCloseValues(array) {
  const result = [];

  if (array.length === 0) {
    return result;
  }

  for (let i = 1; i <= Math.floor(array.length / 2); i++) {
    const newValue1 = array[0] * i + 1;
    const newValue2 = array[array.length - 1] + i;
    result.push(newValue1, newValue2);
  }

  return result;
}

const FuseWire = () => {
  const {fuseHolders, blankValues} = useContext(FuseWireContext);
  const [fuse, setFuse] = useState(
    getFusePositions([...blankValues, ...generateCloseValues(blankValues)]),
  );

  const handleCheck = () => {
    const checkIfCorrect = () =>
      fuseHolders
        .filter(fuseHolder => fuseHolder.initiallyBlank)
        .every(fuseHolder => fuseHolder.sequence === fuseHolder.inputValue);
    const result = checkIfCorrect();

    console.log(result);
  };

  return (
    <View style={styles.mainContainer}>
      {fuseHolders.map((fuseHolder, index) => (
        <FuseHolder
          key={index}
          position={fuseHolder.position}
          value={fuseHolder.sequence}
          initiallyBlank={fuseHolder.initiallyBlank}
        />
      ))}
      {fuse.map((row, rowIndex) =>
        row.map((fuse, colIndex) => (
          <Fuse
            key={`${rowIndex}-${colIndex}`}
            position={fuse.position}
            value={fuse.value}
          />
        )),
      )}
      <TouchableOpacity style={styles.button} onPressIn={handleCheck}>
        <Text style={styles.text}>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 50,
  },
});

export default FuseWire;
