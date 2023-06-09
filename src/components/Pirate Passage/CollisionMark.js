import {useContext, useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {constants} from '../../utilities/Pirate Passage';
const {collisionMarkSize} = constants;
import {PiratePassageContext} from '../../providers/PiratePassage.Provider';
const CollisionMark = ({position}) => {
  const {matrix} = useContext(PiratePassageContext);
  const coordinates = matrix[position[0]][position[1]].position;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: collisionMarkSize,
        height: collisionMarkSize,
        position: 'absolute',
        top: coordinates.y - collisionMarkSize / 2,
        left: coordinates.x - collisionMarkSize / 2,
        opacity: opacity,
        transform: [{scale: scale}],
        zIndex: 1000,
        backgroundColor: 'red',
      }}></Animated.View>
  );
};

export default CollisionMark;
