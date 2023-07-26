import {useContext, useEffect, useState, useMemo} from 'react';
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
import {interpolate} from 'flubber';
import {frames} from '../../components/Frog Game/frames';

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
    GameRef.once('value', snapshot => {
      const exists = snapshot.exists();
      if (exists) {
        setCompletedPopup(true);
        setLoading(false);
      } else {
        calculateInterpolations();
      }
    }).catch(err => console.log(err));
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
          // backgroundColor: '#1b5256',
        }}>
        {lillipadPositions.map((lillipad, index) => {
          return (
            <Lillipad
              key={index}
              position={lillipad.position}
              id={lillipad.id}
              rotation={lillipad.rotation}
            />
          );
        })}
        <FollowerFrog interpolations={interpolations} />
        <LeaderFrog interpolations={interpolations} />
      </View>
    </GameWrapper>
  );
};

export default FrogJump;
