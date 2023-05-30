import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getSeedPacketPositions} from '../../utilities/Organic Order';
import {OrganicOrderContext} from '../../providers/OrganicOrder.Provider';
import SeedPacket from '../../components/Organic Order/SeedPacket';
import PlantPot from '../../components/Organic Order/PlantPot';

const OrganicOrder = () => {
  const {plantPots} = useContext(OrganicOrderContext);
  const [seedPackets] = useState(
    getSeedPacketPositions(Array.from({length: 5}, () => 0)),
  );

  //make array of 5 0s

  // const handleCheck = () => {
  //   const checkIfCorrect = () =>
  //     plantPots
  //       .filter(fuseHolder => fuseHolder.initiallyBlank)
  //       .every(fuseHolder => fuseHolder.sequence === fuseHolder.inputValue);
  //   const result = checkIfCorrect();

  //   console.log(result);
  // };

  return (
    <View style={styles.mainContainer}>
      {plantPots.map((fuseHolder, index) => (
        <PlantPot
          key={index}
          position={fuseHolder.position}
          value={fuseHolder.sequence}
        />
      ))}
      {seedPackets.map((packet, rowIndex) => (
        <SeedPacket
          key={rowIndex}
          position={packet.position}
          value={packet.value}
        />
      ))}
      {/* <TouchableOpacity style={styles.button} onPressIn={handleCheck}>
        <Text style={styles.text}>Check</Text>
      </TouchableOpacity> */}
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

export default OrganicOrder;
