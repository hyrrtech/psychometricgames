import {useRef, useContext} from 'react';
import {View, PanResponder, Animated, StyleSheet, Text} from 'react-native';
import {OrganicOrderContext} from '../../providers/OrganicOrder.Provider';
import {constants} from '../../utilities/Organic Order';
const {SeedPacketHeight, SeedPacketWidth, PlantPotHeight, PlantPotWidth} =
  constants;

const SeedPacket = ({position, value}) => {
  const {plantPots, setPlantPots} = useContext(OrganicOrderContext);
  const currentPlantPotId = useRef(null);
  const pan = useRef(new Animated.ValueXY(position)).current;
  const scale = useRef(new Animated.Value(1)).current;
  console.log(position);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
      Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: false,
      }).start();
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      const {exist, position} = isDropZone(gesture);
      if (exist) {
        const {x, y} = position;
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {
              x: x - SeedPacketWidth / 2,
              y: y - SeedPacketHeight / 2,
            },
            useNativeDriver: false,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        resetPosition();
      }
    },
  });

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(pan, {
        toValue: position,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();

    if (currentPlantPotId.current !== null) {
      setPlantPots(prevState => {
        const newState = [...prevState];
        newState[currentPlantPotId.current].isBlank = true;
        newState[currentPlantPotId.current].inputValue = null;
        currentPlantPotId.current = null;
        return newState;
      });
    }
  };
  const isDropZone = gesture => {
    let result = {exist: false, position: null};

    plantPots.some(plantPot => {
      if (
        gesture.moveY > plantPot.position.y - PlantPotHeight / 2 &&
        gesture.moveY <
          plantPot.position.y - PlantPotHeight / 2 + PlantPotHeight &&
        gesture.moveX > plantPot.position.x - PlantPotWidth / 2 &&
        gesture.moveX <
          plantPot.position.x - PlantPotWidth / 2 + PlantPotWidth &&
        plantPot.isBlank
      ) {
        result = {exist: true, position: plantPot.position};
        setPlantPots(prevState => {
          const newState = [...prevState];
          if (currentPlantPotId.current !== null) {
            newState[currentPlantPotId.current].isBlank = true;
            newState[currentPlantPotId.current].inputValue = null;
          }

          newState[plantPot.id].isBlank = false;
          newState[plantPot.id].inputValue = value;
          currentPlantPotId.current = plantPot.id;
          return newState;
        });

        return true;
      }
    });

    return result;
  };
  return (
    <Animated.View
      style={[
        {transform: [...pan.getTranslateTransform(), {scale: scale}]},
        styles.packet,
      ]}
      {...panResponder.panHandlers}></Animated.View>
  );
};

const styles = StyleSheet.create({
  packet: {
    position: 'absolute',
    backgroundColor: '#1abc9c',
    width: SeedPacketWidth,
    height: SeedPacketHeight,
  },
});
export default SeedPacket;
