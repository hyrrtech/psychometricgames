import {useEffect, useState, useRef, useContext, memo} from 'react';
import {Animated, Easing} from 'react-native';
import TrainVerticalSvg from './SVG/TrainVerticalSvg';
import TrainHorizontalSvg from './SVG/TrainHorizontalSvg';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {
  adjustCoordinates,
  fillSwitchesPassed,
  getSegmentLength,
  getLastSwitchChanged,
  constants,
  path,
} from '../../utilities/Train of Thoughts';

const {trainSize, switchSize, speed} = constants;
const DemoTrain = ({color, id}) => {
  const {switchDirections, demoState, setDemoState} = useContext(
    TrainOfThoughtsContext,
  );
  const SwitchDirections = useRef(switchDirections);
  const switchesPassed = useRef([]);
  const changedSwitches = useRef([]);

  const segmentStartTime = useRef(Date.now());
  const segmentEndTime = useRef(Date.now());
  const stopTime = useRef(0);

  const pathFollowed = useRef([]);
  const [trainDirection, setTrainDirection] = useState('0rad');

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

  const moveTrain = (PATH, startWithDuration) => {
    let index = currentIndex.current;
    if (index < PATH.length) {
      const segmentLength = getSegmentLength(PATH[index - 1], PATH[index]);
      const duration = segmentLength * (1000 / speed);
      segmentEndTime.current = Date.now() + duration;
      const startTime = segmentStartTime.current || Date.now();
      const elapsedTime = Date.now() - startTime;
      const remainingDuration = duration - elapsedTime;

      const nextPoint = PATH[index];
      const deltaX = nextPoint.x - PATH[index - 1].x;
      const deltaY = nextPoint.y - PATH[index - 1].y;
      const direction = Math.atan2(deltaY, deltaX);
      const directionInDegrees = Math.ceil((direction * 180) / Math.PI);

      let trainDirectionProps = `${directionInDegrees}deg`;

      setTrainDirection(trainDirectionProps);
      if (PATH[index]?.id) {
        switchesPassed.current = [
          ...switchesPassed.current,
          ...fillSwitchesPassed(PATH[index].id),
        ];
      }

      Animated.timing(trainPosition, {
        toValue: {x: PATH[index].x, y: PATH[index].y},
        duration: startWithDuration ? startWithDuration : remainingDuration,
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

          if (PATH[index]?.color) {
            if (PATH[index].color === demoState.trainColor) {
              setDemoState(prev => ({
                ...prev,
                demoStage: true,
              }));
            } else {
              setDemoState(prev => ({
                ...prev,
                demoStage: false,
                disableSwitches: true,
              }));
            }
          }

          ++currentIndex.current;
          segmentStartTime.current = Date.now();
          if (demoState.demoStage === 2) {
            setDemoState(prev => ({
              ...prev,
              demoStage: 3,
            }));
          }
          moveTrain(PATH);
        }
      });
    }
  };

  useEffect(() => {
    switchesPassed.current = [];
    changedSwitches.current = [];
    pathFollowed.current = [];
    currentIndex.current = 1;
    segmentStartTime.current = Date.now();
    trainPosition.setValue({x: PATH[0].x, y: PATH[0].y});
  }, [id]);

  useEffect(() => {
    if (id === 0) {
      if (demoState.stopTrain) {
        trainPosition.stopAnimation(() => {
          stopTime.current = Date.now();
        });
      }
      if (demoState.demoStage === 2 && !demoState.stopTrain) {
        const newDuration = segmentEndTime.current - stopTime.current;
        moveTrain(PATH, newDuration);
        return;
      }
    }
  }, [demoState]);

  useEffect(() => {
    if (
      (demoState.demoStage === 3 || demoState.demoStage <= 1) &&
      !demoState.stopTrain
    )
      moveTrain(PATH);
  }, [PATH, id]);

  return (
    <Animated.View
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

export default DemoTrain;
