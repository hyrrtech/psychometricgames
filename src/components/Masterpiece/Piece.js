import {PanResponder, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {constants} from '../../utilities/Masterpiece';
import {useContext, useRef, useState, useEffect} from 'react';
import {MasterpieceContext} from '../../providers/Masterpiece.Provider';
const {ratio} = constants;

const Piece = ({pathD, viewBox, initialPosition, id}) => {
  const {positionsState, setPositionsState} = useContext(MasterpieceContext);
  const {x, y, width, height} = viewBox;
  const [pieceHeight, pieceWidth] = [height * ratio, width * ratio];
  const calibratedInitialPosition = {
    x: initialPosition.x - pieceWidth / 2,
    y: initialPosition.y - pieceHeight / 2,
  };

  const currentPositionId = useRef(null);
  const pan = useRef(new Animated.ValueXY(calibratedInitialPosition)).current;
  const [piecePicked, setPiecePicked] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
      setPiecePicked(true);
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      pan.flattenOffset();
      const {exist, position} = isDropZone(gesture);
      setPiecePicked(false);
      if (exist) {
        const {x, y} = position;
        Animated.spring(pan, {
          toValue: {
            x: x - pieceWidth / 2,
            y: y - pieceHeight / 2,
          },
          useNativeDriver: false,
        }).start();
      } else {
        resetPosition();
      }
    },
  });

  const resetPosition = () => {
    console.log('fired');
    Animated.spring(pan, {
      toValue: calibratedInitialPosition,
      useNativeDriver: false,
    }).start();
    if (currentPositionId.current !== null) {
      setPositionsState(prevState => {
        let newState = [...prevState];
        newState[currentPositionId.current] = {
          ...newState[currentPositionId.current],
          isBlank: true,
        };
        return newState;
      });

      currentPositionId.current = null;
    }
  };
  const isDropZone = gesture => {
    let result = {exist: false, position: null};

    positionsState.some(validPosition => {
      if (
        gesture.moveY > validPosition.position.y - pieceHeight / 2 &&
        gesture.moveY <
          validPosition.position.y - pieceHeight / 2 + pieceHeight &&
        gesture.moveX > validPosition.position.x - pieceWidth / 2 &&
        gesture.moveX <
          validPosition.position.x - pieceWidth / 2 + pieceWidth &&
        validPosition.isBlank
      ) {
        result = {exist: true, position: validPosition.position};

        setPositionsState(prevState => {
          let newState = [...prevState];
          if (currentPositionId.current !== null) {
            newState[currentPositionId.current] = {
              ...newState[currentPositionId.current],
              isBlank: true,
            };
          }
          newState[validPosition.id] = {
            ...newState[validPosition.id],
            isBlank: false,
          };

          return newState;
        });

        currentPositionId.current = validPosition.id;

        return true;
      }
    });

    return result;
  };

  useEffect(() => {
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: calibratedInitialPosition,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        {transform: pan.getTranslateTransform()},
      ]}
      {...panResponder.panHandlers}>
      <Svg
        width={pieceWidth}
        height={pieceHeight}
        viewBox={`${x} ${y} ${width} ${height}`}>
        <Path
          d={pathD}
          fill="#4C4ACF"
          stroke={'white'}
          strokeWidth={piecePicked ? 4 : 2}
        />
      </Svg>
    </Animated.View>
  );
};

export default Piece;
