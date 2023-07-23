import {View, ActivityIndicator} from 'react-native';
import {useState, useReducer, useContext, useEffect} from 'react';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';
import styles from './styles';
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import {COLORS} from '../../values/Colors';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import {reducer, ACTIONS} from './reducer';
import initialState from './initialState';
import {Fish, Deck} from '../../components/Fish Game';
import {constants, gameRoundData} from '../../utilities/Fish Game';
import {interpolate} from 'flubber';
import {frames} from '../../components/Fish Game/frames';

const {poundAreaHeight, poundAreaWidth} = constants;

const FishGame = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/ColorMatch/`);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [interpolations, setInterpolations] = useState({});

  const calculateInterpolations = async () => {
    const interpolations = await new Promise(resolve => {
      setTimeout(() => {
        const result = Object.keys(frames[0]).reduce((acc, key) => {
          acc[key] = frames.map((frame, index) =>
            interpolate(frame[key], frames[(index + 1) % frames.length][key], {
              maxSegmentLength: 7,
            }),
          );

          return acc;
        }, {});

        resolve(result);
      }, 0);
    });
    setInterpolations(interpolations);
    setLoading(false);
  };
  useEffect(() => {
    calculateInterpolations();
  }, []);

  useEffect(() => {
    const lastLevel = gameRoundData.length - 1;
    if (state.baitCount === 0 && state.level !== lastLevel) {
      dispatch({type: ACTIONS.NEXT_LEVEL});
    } else if (state.baitCount === 0 && state.level === lastLevel) {
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'FishGame',
      });
    }
  }, [state.baitCount]);

  useEffect(() => {
    if (state.lives === 0) {
      navigation.navigate('Transition', {
        state: state,
        cameFrom: 'FishGame',
      });
    }
  }, [state.lives]);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : completedPopup ? (
    <CompletedPopup gameName="SHARK" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.sharkBGGrandient}
      scoreboard={[
        <InfoLabel
          label={'Level'}
          value={state.level}
          style={styles.infoLabel}
          key="level"
        />,
        <InfoLabel
          label={'Lives'}
          value={state.lives.toString()}
          style={styles.infoLabel}
          key="lives"
        />,
      ]}>
      <View
        style={{
          height: poundAreaHeight,
          width: poundAreaWidth,
          backgroundColor: 'rgb(32, 156, 226)',
        }}>
        {state.fish.map((fish, index) => (
          <Fish
            key={fish.id}
            ACTIONS={ACTIONS}
            dispatch={dispatch}
            id={index}
            interpolations={interpolations}
          />
        ))}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignItems: 'center',
        }}>
        <Deck baitCount={state.baitCount} />
      </View>
    </GameWrapper>
  );
};
export default FishGame;
