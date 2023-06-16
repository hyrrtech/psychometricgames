import {View, Animated, Easing} from 'react-native';
import {useRef, useState, useContext, useEffect} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
const {shipSize, time_to_cover_each_tile} = constants;

const PirateShip = ({
  color,
  shipPath,
  initialPosition,
  initialPositionIndex,
  isLoop,
  moveDirection,
}) => {
  const path = useRef(shipPath);

  const {go} = useContext(PiratePassageContext);

  const position = useRef(
    new Animated.ValueXY({
      x: initialPosition.x - shipSize / 2,
      y: initialPosition.y - shipSize / 2,
    }),
  ).current;
  const currentIndex = useRef(initialPositionIndex);

  const moveShip = () => {
    let index = currentIndex.current;
    const nextIndex = index + 1;

    if (nextIndex < path.current.length) {
      const nextPoint = path.current[nextIndex];
      const deltaX = nextPoint.x - path.current[index].x;
      const deltaY = nextPoint.y - path.current[index].y;
      const direction = Math.atan2(deltaY, deltaX);
      const directionInDegrees = Math.ceil((direction * 180) / Math.PI);

      let trainDirectionProps = `${directionInDegrees}deg`;

      Animated.timing(position, {
        toValue: {
          x: path.current[nextIndex].x - shipSize / 2,
          y: path.current[nextIndex].y - shipSize / 2,
        },
        duration: time_to_cover_each_tile,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          if (nextIndex === path.current.length - 1 && isLoop) {
            currentIndex.current = 0; // Reset to the first index
            moveShip();
          } else if (nextIndex === path.current.length - 1 && !isLoop) {
            const reversePath = [...path.current].reverse();
            path.current = [...reversePath];
            currentIndex.current = 0; // Reset to the first index
            moveShip();
          } else {
            currentIndex.current = nextIndex;
            moveShip();
          }
        }
      });
    } else if (nextIndex === path.current.length && moveDirection === -1) {
      const reversePath = [...path.current].reverse();
      path.current = reversePath;
      currentIndex.current = 0;
      moveShip();
    }
  };

  useEffect(() => {
    if (go) {
      moveShip();
    }
  }, [go]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        height: shipSize,
        width: shipSize,
        backgroundColor: color,
        position: 'absolute',
        transform: [{translateX: position.x}, {translateY: position.y}],
      }}></Animated.View>
  );
};

export default PirateShip;
