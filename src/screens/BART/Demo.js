import {useRef, useEffect, useState, useMemo} from 'react';
import {Animated, Dimensions, Easing, View} from 'react-native';
import Svg from 'react-native-svg';
import {COLORS} from '../../values/Colors';
import BackgroundImage from '../../values/BackgroundImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GameWrapper} from '../../components/GameWrapper';
import {PlaySound, useDebounce} from '../../utilities';
import {
  InflatingBalloon,
  PoppedBalloon,
  PointerModal,
  Modal,
} from '../../components/Balloon';
import {
  BALLOON_PUMP_ANIMATION_TIME,
  BALLOON_FLYAWAY_ANIMATION_TIME,
} from './initialState';

import balloon_pump from '../../assets/sounds/balloon_pump.wav';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const scalingFactor =
  windowHeight > windowWidth
    ? (windowHeight / windowWidth) * 10
    : (windowWidth / windowHeight) * 10;

const Demo = ({setShowDemo}) => {
  const popPoint = 3;
  const [demoState, setDemoState] = useState({
    pumpDisabled: true,
    collectDisabled: true,
    demoStage: 1,
    pumpCount: 0,
    showPopped: false,
  });
  const [flyInOrOut, setFlyInOrOut] = useState('in');
  const [pumpButtonProps, setPumpButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [collectButtonProps, setCollectButtonProps] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const sizeAnimation = useRef(new Animated.Value(scalingFactor * 15)).current;
  const flyAwayAnimation = useRef(new Animated.Value(0)).current;
  const flyInAnimation = useRef(new Animated.Value(0)).current;

  const ModalFlow = useMemo(() => {
    switch (demoState.demoStage) {
      case 1:
        return (
          <Modal
            content={`Instructions:\n
1. You'll see a balloon on the screen.
2. Click the 'Pump' button to inflate the balloon and earn points.
3. But be cautious! The balloon might burst at any time, and if it does, you'll lose all your points for that balloon.
4. You can choose to stop pumping and 'collect' your points by clicking the 'Collect' button.
5. Your goal is to decide when to stop and collect your points to avoid the balloon bursting.`}
            onPress={() => {
              setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1}));
              setDemoState(prev => ({...prev, pumpDisabled: false}));
            }}
          />
        );
      case 2:
        return (
          <PointerModal
            content={`Great! Now it's time to start. Click here to inflate the balloon.`}
            relativeDim={pumpButtonProps}
            buttonNumber={1}
          />
        );
      case 3:
      case 4:
        return (
          <PointerModal
            content={`Keep clicking to inflate the balloon`}
            relativeDim={pumpButtonProps}
            buttonNumber={1}
          />
        );
      //balloon will pop
      case 5:
        return (
          <Modal
            content={`"Oh no! The balloon burst. That means you lost all the points for that balloon.\n\nDon't worry, though. You can always try again. Just keep in mind to click 'COLLECT' before the balloon bursts to protect your points. Let's give it another shot!"`}
            onPress={() => {
              setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1}));
              setDemoState(prev => ({
                ...prev,
                collectDisabled: true,
                pumpDisabled: false,
              }));
            }}
          />
        );
      case 6:
        return (
          <PointerModal
            content={`Click here to inflate the balloon.`}
            relativeDim={pumpButtonProps}
            buttonNumber={1}
          />
        );
      //now ask them to collect it
      case 7:
        return (
          <PointerModal
            content={`Great! Now click here to collect your points.`}
            relativeDim={collectButtonProps}
            buttonNumber={2}
          />
        );
      case 8:
        return (
          <Modal
            content={`Congratulations! You're doing great. Remember, each balloon color behaves differently:\n
-Black balloons tend to burst quicker.
-Red balloons have a moderate burst rate.
-Yellow balloons take longer to burst.`}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('BART_DEMO', 'FINISHED');
                setShowDemo(false);
              } catch (error) {
                console.error('Error saving data:', error);
              }
            }}
          />
        );
      default:
        return null;
    }
  }, [demoState.demoStage]);

  const flyInAnimationHandler = () => {
    flyInAnimation.setValue(0);
    setFlyInOrOut('in');
    Animated.timing(flyInAnimation, {
      toValue: 1,
      duration: BALLOON_FLYAWAY_ANIMATION_TIME,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    flyInAnimationHandler();
  }, []);

  const onLevelEnd = () => {
    flyAwayAnimation.setValue(0);
    flyInAnimation.setValue(0);
    sizeAnimation.setValue(scalingFactor * 15);
    setDemoState(prev => ({...prev, showPopped: false}));
    flyInAnimationHandler();
  };

  const handlePump = useDebounce(() => {
    if (demoState.pumpDisabled) return;

    if (demoState.pumpCount + 1 === popPoint) {
      setDemoState(prev => ({
        ...prev,
        showPopped: true,
        demoStage: prev.demoStage + 1,
        pumpDisabled: true,
        collectDisabled: true,
        pumpCount: 0,
      }));
      // pop logic
      setTimeout(() => {
        onLevelEnd();
      }, 1500);
      return;
    }
    setDemoState(prev => {
      return {
        ...prev,
        pumpCount: prev.pumpCount + 1,
        demoStage: prev.demoStage + 1,
        pumpDisabled: prev.demoStage === 6 ? true : false,
        collectDisabled: prev.demoStage === 6 ? false : true,
      };
    });
    PlaySound(balloon_pump);
    Animated.timing(sizeAnimation, {
      toValue: sizeAnimation._value + scalingFactor,
      easing: Easing.linear,
      duration: BALLOON_PUMP_ANIMATION_TIME,
      useNativeDriver: false,
    }).start();
  }, BALLOON_PUMP_ANIMATION_TIME);

  const handleCollect = useDebounce(() => {
    if (demoState.collectDisabled) return;
    setFlyInOrOut('out');
    if (demoState.showPopped === false) {
      Animated.timing(flyAwayAnimation, {
        toValue: 1,
        duration: BALLOON_FLYAWAY_ANIMATION_TIME,
        useNativeDriver: false,
      }).start(() =>
        setDemoState(prev => ({...prev, demoStage: prev.demoStage + 1})),
      );
    }
  }, BALLOON_FLYAWAY_ANIMATION_TIME);

  return (
    <GameWrapper
      imageURL={BackgroundImage.BART}
      backgroundGradient={COLORS.balloonBGColor}
      controllerButtons={[
        {
          title: 'Pump',
          onPress: handlePump,
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setPumpButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
        {
          title: 'Collect',
          onPress: handleCollect,
          onLayout: event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setCollectButtonProps({
                x: x + pageX,
                y: y + pageY,
                height,
                width,
              });
            });
          },
        },
      ]}>
      <AnimatedSvg
        width={sizeAnimation}
        height={sizeAnimation}
        style={{
          transform: [
            {
              translateY:
                flyInOrOut === 'out'
                  ? flyAwayAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -windowHeight / 1.3],
                    })
                  : flyInAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [windowHeight / 1.3, 0],
                    }),
            },
          ],
        }}
        viewBox={`0 0 287 349`}
        fill="none">
        {demoState.showPopped ? (
          <PoppedBalloon balloonColor={'#ffca28'} />
        ) : (
          <InflatingBalloon balloonColor={'#ffca28'} />
        )}
      </AnimatedSvg>

      {ModalFlow}
    </GameWrapper>
  );
};

export default Demo;
