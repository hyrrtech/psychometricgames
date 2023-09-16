import {TouchableOpacity, Text, Animated} from 'react-native';
import SwitchSvgVertical from './SVG/SwitchSvgVertical';
import SwitchSvgTurn from './SVG/SwitchSvgTurn';
import {useContext, useEffect, useMemo, useRef} from 'react';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import {
  adjustCoordinates,
  constants,
  getCorrectPath,
} from '../../utilities/Train of Thoughts';
const {switchSize} = constants;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Switch = (point, id, directions) => {
  const {
    switchDirections,
    setSwitchDirections,
    demoState,
    showDemo,
    setDemoState,
  } = useContext(TrainOfThoughtsContext);
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  const direction = switchDirections[id - 1];

  const disableSwitch = useMemo(() => {
    if (showDemo) {
      return demoState.disableSwitch;
    }
  }, [demoState]);

  const handlePress = () => {
    const newSwitchDirections = [...switchDirections];
    direction === directions[0]
      ? (newSwitchDirections[id - 1] = directions[1])
      : (newSwitchDirections[id - 1] = directions[0]);

    setSwitchDirections(() => newSwitchDirections);
  };
  point = adjustCoordinates(point);

  const stepX = point.x;
  const stepY = point.y;

  useEffect(() => {
    if (showDemo) {
      const SwitchIds = getCorrectPath(demoState.trainColor);
      if (SwitchIds.includes(id)) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacityAnimation, {
              toValue: 0.5,
              duration: 700,
              useNativeDriver: false,
            }),
            Animated.timing(opacityAnimation, {
              toValue: 1,
              duration: 700,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      }
    } else {
      opacityAnimation.setValue(1);
    }
  }, [showDemo]);

  return (
    <AnimatedTouchableOpacity
      disabled={directions.length === 1 || disableSwitch}
      onPress={handlePress}
      activeOpacity={0.8}
      key={`${stepX}-${stepY}-switch`}
      style={{
        position: 'absolute',
        zIndex: 19,
        left: stepX,
        top: stepY,
        height: switchSize,
        width: switchSize,
        opacity: disableSwitch ? 1 : opacityAnimation,
      }}>
      {direction === 'vertical' && (
        <SwitchSvgVertical
          height={switchSize}
          width={switchSize}
          rotation={'0deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'horizontal' && (
        <SwitchSvgVertical
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'horizontal_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'vertical_left_down' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'90deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'horizontal_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'vertical_right' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'270deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'vertical_left' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'0deg'}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {direction === 'horizontal_left_up' && (
        <SwitchSvgTurn
          height={switchSize}
          width={switchSize}
          rotation={'180deg'}
          scaleX={-1}
          showOnlyTrack={directions.length === 1}
          backgroundColor={disableSwitch ? '#cf372b' : '#4AA653'}
        />
      )}
      {/* <Text style={{position: 'absolute', zIndex: 99999}}>{id}</Text> */}
    </AnimatedTouchableOpacity>
  );
};

export default Switch;
