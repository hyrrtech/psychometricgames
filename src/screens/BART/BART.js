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
import styles from './styles';
import useDebounce from '../../utilities/useDebounce';
import {InflatingBalloon, PoppedBalloon} from '../../components/Balloon';
import {COLORS} from '../../values/Colors';
import balloonBG from '../../assets/balloonBG.png';
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
import {Button} from '../../components/Button';
import {InfoLabel} from '../../components/InfoLabel';
import {ScorePopup} from '../../components/ScorePopup';
import CompletedPopup from '../../components/CompletedPopup';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const scalingFactor =
  windowHeight > windowWidth
    ? (windowHeight / windowWidth) * 10
    : (windowWidth / windowHeight) * 10;

const BART = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const BARTRef = db.ref(`/users/${user.uid}/BART/`);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const sizeAnimation = useRef(new Animated.Value(scalingFactor * 15)).current;
  const flyAwayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    BARTRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        const data = snapshot.val();
        const {level, totalScore, status, score_range} = data;
        if (status === 'COMPLETED') {
          setCompletedPopup(true);
          return;
        }
        if (level !== 1)
          dispatch({
            type: ACTIONS.NEXT_LEVEL,
            payload: {
              level: level,
              totalScore: totalScore,
              score_range: score_range,
              uid: user.uid,
            },
          });
        setLoading(false);
      } else {
        BARTRef.set({
          totalScore: 0,
          level: 1,
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

  const onLevelEnd = () => {
    dispatch({type: ACTIONS.NEXT_LEVEL, payload: {uid: user.uid}});
    flyAwayAnimation.setValue(0);
    sizeAnimation.setValue(scalingFactor * 15);
    navigation.navigate('Transition', {
      state: state,
      cameFrom: 'BART',
    });
  };

  const handlePump = useDebounce(() => {
    if (state.pumpCount + 1 === state.pop_point) {
      dispatch({type: ACTIONS.PUMP});
      dispatch({type: ACTIONS.POP_ON_PUMP});
      setTimeout(() => {
        onLevelEnd();
      }, 1500);
      return;
    }
    dispatch({type: ACTIONS.PUMP});
    Animated.timing(sizeAnimation, {
      toValue: sizeAnimation._value + scalingFactor,
      easing: Easing.linear,
      duration: BALLOON_PUMP_ANIMATION_TIME,
      useNativeDriver: false,
    }).start();
  }, BALLOON_PUMP_ANIMATION_TIME);

  const handleCollect = useDebounce(() => {
    if (state.pumpCount !== 0) {
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
      imageURL={balloonBG}
      backgroundGradient={COLORS.balloonBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Total Score'}
          value={state.totalScore || '0'}
          style={styles.infoLabel}
          key="total_score"
        />,
        <InfoLabel
          label={'Score'}
          value={state.curr_score || '0'}
          style={styles.infoLabel}
          key="score"
        />,
      ]}
      level={
        <InfoLabel label={`Level ${state.level}`} style={styles.infoLabel} />
      }
      controllerButtons={[
        <Button
          key="pump"
          title="Pump"
          style={styles.button}
          onPressIn={handlePump}
        />,
        <Button
          key="collect"
          title="Collect"
          style={styles.button}
          onPressIn={handleCollect}
        />,
      ]}>
      <AnimatedSvg
        width={sizeAnimation}
        height={sizeAnimation}
        style={{
          transform: [
            {
              translateY: flyAwayAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -windowHeight / 1.3],
              }),
            },
          ],
        }}
        viewBox={`0 0 287 349`}
        fill="none">
        {state.showPopped ? <PoppedBalloon /> : <InflatingBalloon />}
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
