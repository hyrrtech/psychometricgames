import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';

import {ACTIONS, reducer} from './reducer';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';
import {Spider, Butterfly} from '../../components/Kill The Spider';
import insect_squish from '../../assets/sounds/insect_squish.mp3';
import {stateGenerator, time} from '../../utilities/Kill the Spider';
import {PlaySound, useCountdown} from '../../utilities';

const {height, width} = Dimensions.get('window');
const spawnAreaHeight = height * 0.65;
const spawnAreaWidth = width * 0.95;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const KillTheSpider = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/KillTheSpider/`);
  const [state, dispatch] = useReducer(reducer, stateGenerator());
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const TIME = useCountdown(time.minutes, time.seconds);

  useEffect(() => {
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        setCompletedPopup(true);
      }
    })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (TIME === '00:00') {
      if (state.killCount === 0) {
        navigation.navigate('Home');
        return;
      }
      dispatch({type: ACTIONS.ON_TIME_UP, payload: {uid: user.uid}});

      navigation.navigate('Transition', {
        cameFrom: 'KillTheSpider',
      });
    }
  }, [!completedPopup && TIME]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setDisabled(false), 1000);
  }, [state]);

  const onSpiderTap = () => {
    setDisabled(true);
    PlaySound(insect_squish);
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch({type: ACTIONS.ON_TAP});
    }, 200);
  };
  const onButterflyTap = () => {
    setDisabled(true);
    PlaySound(insect_squish);
    dispatch({type: ACTIONS.ON_BUTTERFLY_TAP, payload: {uid: user.uid}});
    navigation.navigate('Transition', {
      cameFrom: 'KillTheSpider',
    });
  };
  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.KillTheSpider}
      backgroundGradient={COLORS.killTheSpiderBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Time'}
          value={TIME}
          style={styles.infoLabel}
          key="time"
        />,
        <InfoLabel
          label={'Score'}
          value={state.score.toString()}
          style={styles.infoLabel}
          key="score"
          showAnimation={true}
        />,
      ]}>
      <View style={{height: spawnAreaHeight, width: spawnAreaWidth}}>
        <Animated.View
          style={{
            position: 'absolute',
            left: state.spiderPos.x,
            top: state.spiderPos.y,
            opacity: opacityAnim,
            transform: [{rotate: state.spiderRotate}],
          }}>
          <Spider
            dimensions={state.spiderDimension}
            disabled={disabled}
            onPress={onSpiderTap}
            state={state}
          />
        </Animated.View>

        {state.butterflies.map(
          butterfly =>
            butterfly.show && (
              <Animated.View
                key={`${butterfly.butterflyPos.x}-${butterfly.butterflyPos.y}`}
                style={{
                  position: 'absolute',
                  left: butterfly.butterflyPos.x,
                  top: butterfly.butterflyPos.y,
                  opacity: opacityAnim,
                  transform: [{rotate: butterfly.butterflyRotate}],
                }}>
                <Butterfly
                  dimensions={butterfly.butterflyDimension}
                  onPress={onButterflyTap}
                  disabled={disabled}
                />
              </Animated.View>
            ),
        )}
      </View>
      <View></View>
    </GameWrapper>
  );
};

export default KillTheSpider;
