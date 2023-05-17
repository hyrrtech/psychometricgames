import {View, Text, Animated, ActivityIndicator} from 'react-native';
import {useState, useReducer, useContext, useRef} from 'react';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';
import styles from './styles';
import {GameWrapper} from '../../components/GameWrapper';
import CompletedPopup from '../../components/CompletedPopup';
import {COLORS} from '../../values/Colors';
import {Button} from '../../components/Button';
import {InfoLabel} from '../../components/InfoLabel';
import BackgroundImage from '../../values/BackgroundImage';
import {reducer, ACTIONS} from './reducer';
import {Fish} from '../../components/Fish Game';
import {constants, stateGenerator} from '../../utilities/Fish Game';
const {poundAreaHeight, poundAreaWidth} = constants;

const FishGame = () => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/ColorMatch/`);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, stateGenerator(1));

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: poundAreaHeight,
          width: poundAreaWidth,
          backgroundColor: 'rgb(32, 156, 226)',
        }}>
        {state.fish.map((fish, index) => (
          <Fish key={fish.id} ACTIONS={ACTIONS} dispatch={dispatch} />
        ))}
      </View>
    </View>
  );
};
export default FishGame;
