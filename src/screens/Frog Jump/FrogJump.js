import {useContext, useEffect} from 'react';
import {View, ActivityIndicator, LayoutAnimation} from 'react-native';
import CompletedPopup from '../../components/CompletedPopup';
import {GameWrapper} from '../../components/GameWrapper';
import BackgroundImage from '../../values/BackgroundImage';
import {COLORS} from '../../values/Colors';
import {
  FollowerFrog,
  Lillipad,
  LeaderFrog,
  Modal,
} from '../../components/Frog Game';
import {FrogGameContext} from '../../providers/FrogGame.Provider';
import {constants} from '../../utilities/Frog Jump';
import db from '../../firebase/database';
import {AuthContext} from '../../providers/AuthProvider';

const {spawnAreaHeight, spawnAreaWidth, MAX_NUM_OF_JUMPS} = constants;

const FrogJump = ({navigation}) => {
  const {
    lillipadPositions,
    numberOfJumpsByFollowerFrog,
    loading,
    showDemo,
    completedPopup,
    gameOver,
    setShowDemo,
    setDemoState,
    demoState,
  } = useContext(FrogGameContext);
  const {user} = useContext(AuthContext);
  const GameRef = db.ref(`/users/${user.uid}/FollowThatFrog/`);

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
    <CompletedPopup gameName="FOLLOW THAT FROG" />
  ) : (
    <GameWrapper
      imageURL={BackgroundImage.FrogJump}
      backgroundGradient={COLORS.followThatFrogBGColor}
      {...(!showDemo
        ? {
            scoreboard: [
              {
                title: 'Jumps',
                value: `${numberOfJumpsByFollowerFrog.current} of ${MAX_NUM_OF_JUMPS}`,
              },
            ],
          }
        : {})}>
      {showDemo && demoState.demoStage !== 2 ? (
        <Modal
          content={
            demoState.demoStage === 1
              ? `Instructions:\n\nHelp the 'Green Frog' follow the 'Orange Frog'.`
              : `Great Job! You've completed the demo.`
          }
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            if (demoState.demoStage === 1) {
              setDemoState(prev => ({demoStage: prev.demoStage + 1}));
              return;
            }
            setShowDemo(false);
          }}
        />
      ) : (
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
          <FollowerFrog />
          <LeaderFrog />
        </View>
      )}
      {showDemo && demoState.demoStage === 2 ? (
        <Modal
          content={'Tap on the highlighted lillipad to make the frog jump.'}
          showContinue={false}
          style={{bottom: '5%'}}
        />
      ) : null}
    </GameWrapper>
  );
};

export default FrogJump;
