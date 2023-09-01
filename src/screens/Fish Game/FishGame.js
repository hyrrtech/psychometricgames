import {View, ActivityIndicator} from 'react-native';
import {useState, useReducer, useContext, useEffect} from 'react';
// import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';
import {FishGameContext} from '../../providers/FishGame.Provider';
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import {COLORS} from '../../values/Colors';
import BackgroundImage from '../../values/BackgroundImage';
import {reducer, ACTIONS} from './reducer';
import initialState from './initialState';
import {Fish, Deck, RainDrop} from '../../components/Fish Game';
import {constants, gameRoundData} from '../../utilities/Fish Game';
import Demo from './Demo';

const {poundAreaHeight, poundAreaWidth} = constants;

const FishGame = ({navigation}) => {
  // const {user} = useContext(AuthContext);
  const {interpolations, loading, showDemo} = useContext(FishGameContext);
  // const GameRef = db.ref(`/users/${user.uid}/ColorMatch/`);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const lastLevel = gameRoundData[gameRoundData.length - 1].level;
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
    <CompletedPopup gameName="FISH GAME" />
  ) : showDemo ? (
    <Demo />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.SHARK}
      backgroundGradient={COLORS.fishBGColor}
      scoreboard={[
        {
          title: 'Lives',
          value: state.lives > 0 ? '★'.repeat(state.lives) : '-',
        },
        {title: 'Level', value: state.level},
      ]}>
      <View
        style={{
          height: poundAreaHeight,
          width: poundAreaWidth,
          // backgroundColor: 'rgb(32, 156, 226)',
        }}>
        {state.fish.map((fish, index) => (
          <Fish
            key={fish.id}
            ACTIONS={ACTIONS}
            dispatch={dispatch}
            fishProps={fish}
            interpolations={interpolations}
            level={state.level}
          />
        ))}
        {state.rainDrops.map(raindrop => (
          <RainDrop
            key={raindrop.id}
            interval={raindrop.interval}
            position={raindrop.position}
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
        <Deck
          baitCount={state.baitCount}
          lives={state.lives}
          level={state.level}
        />
      </View>
    </GameWrapper>
  );
};
export default FishGame;
