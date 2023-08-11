import React, {
  useRef,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  View,
  Easing,
  ActivityIndicator,
} from 'react-native';
import Svg from 'react-native-svg';
import {COLORS} from '../../values/Colors';
import BackgroundImage from '../../values/BackgroundImage';
import {PlaySound, useDebounce} from '../../utilities';
import {
  InflatingBalloon,
  PoppedBalloon,
  ScorePopup,
} from '../../components/Balloon';
import {
  initialState,
  BALLOON_PUMP_ANIMATION_TIME,
  BALLOON_FLYAWAY_ANIMATION_TIME,
} from './initialState';
import {reducer, ACTIONS} from './reducer';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';
// wrap into 1
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import balloon_pump from '../../assets/sounds/balloon_pump.wav';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const scalingFactor =
  windowHeight > windowWidth
    ? (windowHeight / windowWidth) * 10
    : (windowWidth / windowHeight) * 10;

const BART = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/BART/`);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [flyInOrOut, setFlyInOrOut] = useState('in');

  //init animations
  const sizeAnimation = useRef(new Animated.Value(scalingFactor * 15)).current;
  const flyAwayAnimation = useRef(new Animated.Value(0)).current;
  const flyInAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        const {level, totalScore, status, score_range, number_of_weights} =
          data;
        if (status === 'COMPLETED') {
          setCompletedPopup(true);
          return;
        }
        if (level !== 1)
          dispatch({
            type: ACTIONS.NEXT_LEVEL, //make init_level for this
            payload: {
              level: level,
              number_of_weights: number_of_weights,
              totalScore: totalScore,
              score_range: score_range,
              uid: user.uid,
            },
          });
        setLoading(false);
      } else {
        GameRef.set({
          //make ACTION for this (INIT_DB)
          totalScore: 0,
          level: 1,
          number_of_weights: state.number_of_weights,
          totalLevels: state.totalLevels,
          score_range: state.score_range,
          max_score_per_level: state.max_score_per_level,
          attempts: {},
          status: 'IN_PROGRESS',
        });
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

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
    dispatch({type: ACTIONS.NEXT_LEVEL, payload: {uid: user.uid}});
    flyAwayAnimation.setValue(0);
    flyInAnimation.setValue(0);
    sizeAnimation.setValue(scalingFactor * 15);
    if (state.level === state.totalLevels) {
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'BART',
      });
    }
    flyInAnimationHandler();
  };

  const handlePump = useDebounce(() => {
    if (state.pumpCount + 1 === state.pop_point) {
      dispatch({type: ACTIONS.PUMP});
      dispatch({type: ACTIONS.POP_ON_PUMP});
      setTimeout(() => {
        onLevelEnd();
      }, 1500); //1500 is popup animation duration
      return;
    }
    PlaySound(balloon_pump);
    dispatch({type: ACTIONS.PUMP});
    Animated.timing(sizeAnimation, {
      toValue: sizeAnimation._value + scalingFactor,
      easing: Easing.linear,
      duration: BALLOON_PUMP_ANIMATION_TIME,
      useNativeDriver: false,
    }).start();
  }, BALLOON_PUMP_ANIMATION_TIME);

  const handleCollect = useDebounce(() => {
    setFlyInOrOut('out');
    if (state.pumpCount !== 0 && state.showPopped === false) {
      Animated.timing(flyAwayAnimation, {
        toValue: 1,
        duration: BALLOON_FLYAWAY_ANIMATION_TIME,
        useNativeDriver: false,
      }).start(() => onLevelEnd());
    }
  }, BALLOON_FLYAWAY_ANIMATION_TIME);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="BART" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.BART}
      backgroundGradient={COLORS.balloonBGColor}
      scoreboard={[
        {title: 'Total Score', value: state.totalScore},
        {title: 'Score', value: state.curr_score},
        {
          title: 'Level',
          value: state.level > 10 ? state.totalLevels : state.level,
        },
      ]}
      controllerButtons={[
        {title: 'Pump', onPress: handlePump},
        {title: 'Collect', onPress: handleCollect},
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
        {state.showPopped ? (
          <PoppedBalloon balloonColor={state.balloon_color} />
        ) : (
          <InflatingBalloon balloonColor={state.balloon_color} />
        )}
      </AnimatedSvg>
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          top: '40%',
        }}>
        <ScorePopup
          scoreIncrement={state.score_range[state.pumpCount]}
          pumpCount={state.pumpCount}
          pop_point={state.pop_point}
        />
      </View>
    </GameWrapper>
  );
};

export default BART;
