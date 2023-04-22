import {useEffect, useState, useRef, useContext} from 'react';
import {Animated, Easing} from 'react-native';
import TrainSvg from './SVG/TrainSvg';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {
  adjustCoordinates,
  fillSwitchesPassed,
  getSegmentLength,
  getLastSwitchChanged,
} from '../../utilities/Train of Thoughts';

const initialSegment = [
  adjustCoordinates({x: 375, y: 850}),
  adjustCoordinates({x: 375, y: 637.5}),
];

const Train = ({color, id, setTrains, dispatch, ACTIONS}) => {
  const {path, trainSize, switchSize, speed, switchDirections} = useContext(
    TrainOfThoughtsContext,
  );
  const prevSwitchDirections = useRef([]);
  const switchesPassed = useRef([]);
  let segmentStartTime = useRef(Date.now());
  const [trainDirection, setTrainDirection] = useState([{rotate: '0rad'}]);

  const generatePath = switchObj => {
    let path = [];
    const id = switchObj.id;
    const currentDirection = switchDirections[id - 1];
    const switchPath = switchObj[currentDirection];

    path.push(
      adjustCoordinates({
        x: switchObj.x + switchSize / 2,
        y: switchObj.y + switchSize / 2,
        id: id,
      }),
    );

    if (switchPath?.switch) {
      path = path.concat(generatePath(switchPath.switch));
    } else if (switchPath?.destination) {
      const destination = adjustCoordinates({
        x: switchPath.destination.x + switchSize / 2,
        y: switchPath.destination.y + switchSize / 2,
        color: switchPath.destination.color,
      });
      path.push(destination);
    }
    return path;
  };

  const [PATH, setPATH] = useState([
    ...initialSegment,
    ...generatePath(path.switch),
  ]);

  var offsetX = 0;
  var offsetY = trainSize / 2;
  const currentIndex = useRef(1);
  const trainPosition = useRef(
    new Animated.ValueXY({x: PATH[0].x - offsetX, y: PATH[0].y - offsetY}),
  ).current;

  useEffect(() => {
    const changedSwitchIndex = getLastSwitchChanged(
      prevSwitchDirections.current,
      switchDirections,
    );
    prevSwitchDirections.current = switchDirections;
    if (switchesPassed.current.includes(changedSwitchIndex)) {
      return;
    }
    setPATH([...initialSegment, ...generatePath(path.switch)]);
  }, [switchDirections]);

  const moveTrain = async PATH => {
    let index = currentIndex.current;
    if (index < PATH.length) {
      const segmentLength = getSegmentLength(PATH[index - 1], PATH[index]);
      const duration = segmentLength * (1000 / speed);
      const startTime = segmentStartTime.current || Date.now();
      const elapsedTime = Date.now() - startTime;
      const remainingDuration = duration - elapsedTime;

      const nextPoint = PATH[index];
      const deltaX = nextPoint.x - PATH[index - 1].x;
      const deltaY = nextPoint.y - PATH[index - 1].y;
      const direction = Math.atan2(deltaY, deltaX);
      const directionInDegrees = Math.ceil((direction * 180) / Math.PI);

      let trainDirectionProps = [{rotate: `${directionInDegrees}deg`}];

      if (directionInDegrees === 180) {
        trainDirectionProps = [{rotate: `${0}deg`}, {scaleX: -1}];
      } else if (directionInDegrees === -90) {
        trainDirectionProps = [{rotate: `${90}deg`}, {scaleX: -1}];
      } else if (directionInDegrees <= 0) {
        trainDirectionProps = [{rotate: `${0}deg`}, {scaleX: -1}];
      } else {
        trainDirectionProps = [{rotate: `${directionInDegrees}deg`}];
      }

      setTrainDirection(trainDirectionProps);
      if (PATH[index]?.id) {
        switchesPassed.current = Array.from(
          new Set([
            ...switchesPassed.current,
            ...fillSwitchesPassed(PATH[index].id),
          ]),
        );
      }
      Animated.timing(trainPosition, {
        toValue: {x: PATH[index].x - offsetX, y: PATH[index].y - offsetY},
        duration: remainingDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && index < PATH.length) {
          if (PATH[index]?.id) {
            switchesPassed.current = Array.from(
              new Set([...switchesPassed.current, PATH[index].id]),
            );
          }
          if (PATH[index]?.color) {
            dispatch({
              type: ACTIONS.ON_REACH_STATION,
              payload: {
                intendedStation: color,
                stationReached: PATH[index].color,
              },
            });

            setTrains(prev => {
              const newTrains = [...prev];
              const trainIndex = newTrains.findIndex(
                train => train.trainId === id,
              );
              newTrains.splice(trainIndex, 1);
              return newTrains;
            });
          }

          ++currentIndex.current;
          segmentStartTime.current = Date.now();
          moveTrain(PATH);
        }
      });
    }
  };

  useEffect(() => {
    moveTrain(PATH);
  }, [PATH]);

  return (
    <Animated.View
      style={[
        trainPosition.getTranslateTransform(),
        {left: 0, top: 0, position: 'absolute', zIndex: 20},
      ]}>
      <TrainSvg
        height={trainSize}
        width={trainSize}
        color={color}
        styles={{
          transform: trainDirection,
        }}
      />
    </Animated.View>
  );
};

export default Train;
