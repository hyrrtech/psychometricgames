import {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import {InfoLabel} from '../../components/InfoLabel';
import db from '../../firebase/database';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import styles from './styles';
import {AuthContext} from '../../providers/AuthProvider';
import {FollowerFrog, Lillipad, LeaderFrog} from '../../components/Frog Game';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {constants} from '../../utilities/Frog Jump';

const {spawnAreaHeight, spawnAreaWidth} = constants;

const FrogJump = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/FollowThatFrog/`);
  const {
    lillipadPositions,
    gameOver,
    MAX_NUM_OF_JUMPS,
    numberOfJumpsByFollowerFrog,
  } = useContext(FrogGameContext);
  const [loading, setLoading] = useState(true);
  const [completedPopup, setCompletedPopup] = useState(false);

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
    if (gameOver) {
      GameRef.set({
        number0fJumps: numberOfJumpsByFollowerFrog.current,
        totalNumOfJumps: MAX_NUM_OF_JUMPS,
      });
      navigation.navigate('Transition', {
        cameFrom: 'FrogJump',
      });
    }
  }, [gameOver]);

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
          label={'Jumps'}
          value={`${numberOfJumpsByFollowerFrog.current} of ${MAX_NUM_OF_JUMPS}`}
          style={styles.infoLabel}
          key="jumps"
        />,
      ]}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
          backgroundColor: '#1b5256',
        }}>
        {lillipadPositions.map((lillipad, index) => {
          return (
            <Lillipad
              key={index}
              position={lillipad.position}
              id={lillipad.id}
            />
          );
        })}
        <FollowerFrog />
        <LeaderFrog />
      </View>
    </GameWrapper>
  );
};

export default FrogJump;
