import {View, Animated, Easing} from 'react-native';
import {useRef, useContext, useEffect} from 'react';
import {constants} from '../../utilities/Pirate Passage';
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';

const {shipSize, time_to_cover_each_tile} = constants;

const Ship = ({color, shipPath}) => {
  const {go} = useContext(PiratePassageContext);
  const intialPosition = shipPath[0];

  const position = useRef(
    new Animated.ValueXY({
      x: intialPosition.x - shipSize / 2,
      y: intialPosition.y - shipSize / 2,
    }),
  ).current;
  const currentIndex = useRef(1);

  const moveShip = () => {
    let index = currentIndex.current;
    if (index < shipPath.length) {
      const nextPoint = shipPath[index];
      const deltaX = nextPoint.x - shipPath[index - 1].x;
      const deltaY = nextPoint.y - shipPath[index - 1].y;
      const direction = Math.atan2(deltaY, deltaX);
      const directionInDegrees = Math.ceil((direction * 180) / Math.PI);

      let trainDirectionProps = `${directionInDegrees}deg`;

      Animated.timing(position, {
        toValue: {
          x: shipPath[index].x - shipSize / 2,
          y: shipPath[index].y - shipSize / 2,
        },
        duration: time_to_cover_each_tile,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && index < shipPath.length) {
          ++currentIndex.current;
          moveShip();
        }
      });
    }
  };
  useEffect(() => {
    if (go) {
      moveShip();
    }
  }, [go]);

  return (
    <Animated.View
      pointerEvents={'none'}
      style={{
        height: shipSize,
        width: shipSize,
        backgroundColor: color,
        position: 'absolute',
        zIndex: 999,
        transform: [{translateX: position.x}, {translateY: position.y}],
      }}></Animated.View>
  );
};

export default Ship;
