import {useEffect, useState, useRef, useContext} from 'react';
import {Animated, Easing} from 'react-native';
import TrainVerticalSvg from './SVG/TrainVerticalSvg';
import TrainHorizontalSvg from './SVG/TrainHorizontalSvg';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {AuthContext} from '../../providers/AuthProvider';
import {
  adjustCoordinates,
  fillSwitchesPassed,
  getSegmentLength,
  getLastSwitchChanged,
  getCorrectPath,
  constants,
  path,
} from '../../utilities/Train of Thoughts';

const {trainSize, switchSize, speed} = constants;
const Train = ({color, id, setTrains, dispatch, ACTIONS, departureTime}) => {
  const {switchDirections, TIME} = useContext(TrainOfThoughtsContext);
  const {user} = useContext(AuthContext);
  const SwitchDirections = useRef(switchDirections);
  const switchesPassed = useRef([]);
  const changedSwitches = useRef([]);
  let segmentStartTime = useRef(Date.now());
  const pathFollowed = useRef([]);
  const [trainDirection, setTrainDirection] = useState('0rad');
  console.log(SwitchDirections.current);

  // const switchesPassedExclusive = id => {
  //   //might not be needed
  //   if (id === 1 && switchDirections[id] === 'horizontal') return [3];
  //   if (id === 7 && switchDirections[id] === 'horizontal') return [8, 9];
  //   if (id === 8 && switchDirections[id] === 'vertical_right') return [9];
  //   if (id === 12 && switchDirections[id] === 'vertical_left') return [13];
  //   if (id === 4 && switchDirections[id] === 'horizontal') return [5];
  //   return [];
  // };

  const generatePath = switchObj => {
    let path = [];
    const id = switchObj.id;
    const currentDirection = SwitchDirections.current[id - 1];
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

  const [PATH, setPATH] = useState(generatePath(path.switch));

  const currentIndex = useRef(1);
  const trainPosition = useRef(
    new Animated.ValueXY({x: PATH[0].x, y: PATH[0].y}),
  ).current;

  useEffect(() => {
    const changedSwitchIndex = getLastSwitchChanged(
      SwitchDirections.current,
      switchDirections,
    );
    if (switchesPassed.current.includes(changedSwitchIndex))
      changedSwitches.current.push(changedSwitchIndex);

    changedSwitches.current = Array.from(
      new Set([...changedSwitches.current, ...switchesPassed.current]),
    );

    if (!changedSwitches.current.includes(changedSwitchIndex)) {
      SwitchDirections.current[changedSwitchIndex - 1] =
        switchDirections[changedSwitchIndex - 1];

      setPATH(generatePath(path.switch));
    }
  }, [switchDirections]);

  const moveTrain = (PATH, TIME) => {
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

      let trainDirectionProps = `${directionInDegrees}deg`;

      // if (directionInDegrees === 180) {
      //   trainDirectionProps = [{rotate: `${0}deg`}, {scaleX: -1}];
      // } else if (directionInDegrees === -90) {
      //   trainDirectionProps = [{rotate: `${90}deg`}, {scaleX: -1}];
      // } else if (directionInDegrees <= 0) {
      //   trainDirectionProps = [{rotate: `${0}deg`}, {scaleX: -1}];
      // } else {
      //   trainDirectionProps = [{rotate: `${directionInDegrees}deg`}];
      // }
      setTrainDirection(trainDirectionProps);
      if (PATH[index]?.id) {
        switchesPassed.current = [
          ...switchesPassed.current,
          ...fillSwitchesPassed(PATH[index].id),
          // ...switchesPassedExclusive(PATH[index].id),
        ];
      }

      Animated.timing(trainPosition, {
        toValue: {x: PATH[index].x, y: PATH[index].y},
        duration: remainingDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && index < PATH.length) {
          if (PATH[index]?.id) {
            pathFollowed.current = [...pathFollowed.current, PATH[index].id];
            switchesPassed.current = [
              ...switchesPassed.current,
              PATH[index].id,
            ];
          }

          if (PATH[index]?.color && TIME !== '00:00') {
            const correctPath = getCorrectPath(color);

            dispatch({
              type: ACTIONS.ON_REACH_STATION,
              payload: {
                departureTime: departureTime,
                arrivalTime: TIME,
                correctPath: [...correctPath, color],
                pathFollowed: [...pathFollowed.current, PATH[index].color],
                uid: user.uid,
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
  console.log('trainDirection', trainDirection);

  useEffect(() => {
    moveTrain(PATH, TIME);
  }, [PATH, TIME]);

  return (
    <Animated.View
      pointerEvents={'none'}
      style={[
        trainPosition.getTranslateTransform(),
        {
          left: -trainSize / 2,
          top: -trainSize / 2,
          position: 'absolute',
          zIndex: 998,
        },
      ]}>
      {trainDirection === '-90deg' && (
        <TrainVerticalSvg height={trainSize} width={trainSize} color={color} />
      )}
      {trainDirection === '0deg' && (
        <TrainHorizontalSvg
          height={trainSize}
          width={trainSize}
          color={color}
          styles={{transform: [{scaleX: -1}]}}
        />
      )}
      {trainDirection === '90deg' && (
        <TrainVerticalSvg
          height={trainSize}
          width={trainSize}
          color={color}
          styles={{transform: [{scaleY: -1}]}}
        />
      )}
      {trainDirection === '180deg' && (
        <TrainHorizontalSvg
          height={trainSize}
          width={trainSize}
          color={color}
        />
      )}
      {trainDirection === '-179deg' && (
        <TrainHorizontalSvg
          height={trainSize}
          width={trainSize}
          color={color}
        />
      )}
    </Animated.View>
  );
};

export default Train;
