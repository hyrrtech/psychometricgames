import {PanResponder, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {constants} from '../../utilities/Masterpiece';
import {useContext, useRef, useState, useEffect, useMemo} from 'react';
import {MasterpieceContext} from '../../providers/Masterpiece.Provider';
const {ratio} = constants;

const Piece = ({pathD, viewBox, initialPosition, id}) => {
  const {
    positionsState,
    elementsData,
    setPositionsState,
    pickedPieceId,
    setPickedPieceId,
    isCorrect,
  } = useContext(MasterpieceContext);
  const [strokeWidth, setStrokeWidth] = useState(pickedPieceId == id ? 3 : 2);
  const {x, y, width, height} = viewBox;
  const [pieceHeight, pieceWidth] = [height * ratio, width * ratio];
  const calibratedInitialPosition = {
    x: initialPosition.x - pieceWidth / 2,
    y: initialPosition.y - pieceHeight / 2,
  };
  const currentPositionId = useRef(null);
  const pan = useRef(new Animated.ValueXY(calibratedInitialPosition)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;

  const rotation = elementsData.find(
    element => element.id === id,
  ).pieceRotationAngle;

  const whenPiecePicked = () => {
    setPickedPieceId(id);
  };

  useEffect(() => {
    if (isCorrect) {
      setStrokeWidth(1);
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isCorrect]);

  const colorInterpolate = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f9bc3c', '#1f2548'],
  });

  const getColor = () => {
    if (isCorrect) {
      return colorInterpolate;
    }
    return pickedPieceId == id ? '#f9bc3c' : '#2ed0f6';
  };
  const color = useMemo(() => getColor(), [isCorrect, pickedPieceId]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({x: 0, y: 0});
      whenPiecePicked();
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),

    onPanResponderRelease: (e, gesture) => {
      if (gesture.moveX === 0 && gesture.moveY === 0) return;
      pan.flattenOffset();
      const {exist, position} = isDropZone(gesture);

      if (exist) {
        //move to a valid position
        const {x, y} = position;
        Animated.spring(pan, {
          toValue: {
            x: x - pieceWidth / 2,
            y: y - pieceHeight / 2,
          },
          useNativeDriver: false,
        }).start();
      } else {
        dropAtCurrentPosition(gesture);
      }
    },
  });

  const dropAtCurrentPosition = gesture => {
    const {moveX, moveY} = gesture;
    Animated.spring(pan, {
      toValue: {
        x: moveX - pieceWidth / 2,
        y: moveY - pieceHeight / 2,
      },
      useNativeDriver: false,
    }).start();
    if (currentPositionId.current !== null) {
      setPositionsState(prevState => {
        let newState = [...prevState];
        newState[currentPositionId.current] = {
          ...newState[currentPositionId.current],
          isBlank: true,
        };
        currentPositionId.current = null;
        return newState;
      });
    }
  };
  const isDropZone = gesture => {
    let result = {exist: false, position: null};

    positionsState.some(validPosition => {
      if (
        gesture.moveY > validPosition.position.y - (pieceHeight / 2) * 0.5 &&
        gesture.moveY <
          validPosition.position.y -
            (pieceHeight / 2) * 0.5 +
            pieceHeight * 0.5 &&
        gesture.moveX > validPosition.position.x - (pieceWidth / 2) * 0.5 &&
        gesture.moveX <
          validPosition.position.x -
            (pieceWidth / 2) * 0.5 +
            pieceWidth * 0.5 &&
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
            idOfPieceAtThisPosition: id,
          };
          currentPositionId.current = validPosition.id;

          return newState;
        });

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
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: pickedPieceId == id ? 2 : 1,
        },
        {
          transform: [
            ...pan.getTranslateTransform(),
            {rotate: `${rotation}deg`},
          ],
        },
      ]}
      {...panResponder.panHandlers}>
      <Svg
        width={pieceWidth}
        height={pieceHeight}
        viewBox={`${x} ${y} ${width} ${height}`}>
        <AnimatedPath
          d={pathD}
          fill={color}
          stroke={'white'}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </Animated.View>
  );
};

export default Piece;
