import {useEffect} from 'react';
import {Button} from '../components/Button';
import {GameWrapper} from '../components/GameWrapper';
import {COLORS} from '../values/Colors';
import {Text, StyleSheet, BackHandler} from 'react-native';
import BackgroundImage from '../values/BackgroundImage';
import {FontStyle} from '../values/Font';

const Transition = ({route, navigation}) => {
  const {state, cameFrom} = route.params;
  const currentLevel = state?.level;
  const totalLevels = state?.totalLevels;

  const values = {
    BART: {
      backgroundGradient: COLORS.balloonBGColor,
      imageURL: BackgroundImage.BART,
      navigateTo: currentLevel === totalLevels ? 'Tabs' : 'BART',

      navigateButtonText: currentLevel === totalLevels ? 'Home' : 'Next Level',
      text:
        currentLevel === totalLevels
          ? 'You have completed the game. Press home to go back to home screen'
          : `You have completed ${currentLevel}/${totalLevels} part of the game. Press next game to play further`,
    },
    SHARK: {
      backgroundGradient: COLORS.sharkBGColor,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    MemoryMatrix: {
      backgroundGradient: COLORS.memoryMatrixBGColor,
      imageURL: BackgroundImage.MemoryMatrix,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press Home to go back to home screen',
    },
    KillTheSpider: {
      backgroundGradient: COLORS.killTheSpiderBGColor,
      imageURL: BackgroundImage.KillTheSpider,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press Home to go back to home screen',
    },
    TrainOfThoughts: {
      backgroundGradient: COLORS.trainOfThoughtsBGColor,
      imageURL: BackgroundImage.TrainofThoughts,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    ColorMatch: {
      backgroundGradient: COLORS.colorMatchBGColor,
      imageURL: BackgroundImage.ColorMatch,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    FrogJump: {
      backgroundGradient: COLORS.followThatFrogBGColor,
      imageURL: BackgroundImage.FrogJump,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    FuseWire: {
      backgroundGradient: COLORS.fuseWireBGColor,
      imageURL: BackgroundImage.FuseWire,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    FishGame: {
      backgroundGradient: COLORS.fishBGColor,
      imageURL: BackgroundImage.FishGame,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    StarSearch: {
      backgroundGradient: COLORS.starSearchBGColor,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    PiratePassage: {
      backgroundGradient: COLORS.piratePassageBGColor,
      imageURL: BackgroundImage.PiratePassage,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    Masterpiece: {
      backgroundGradient: COLORS.masterPieceBGColor,
      imageURL: BackgroundImage.Masterpiece,
      navigateTo: 'Tabs',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
  };
  //prevent navigation to gamescreen when back button is pressed if the game is over
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate(values[cameFrom].navigateTo);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <GameWrapper
      imageURL={values[cameFrom].imageURL}
      showBackButton={false}
      backgroundGradient={values[cameFrom].backgroundGradient}
      controllerButtons={[
        {
          title: values[cameFrom].navigateButtonText,
          onPress: () => navigation.navigate(values[cameFrom].navigateTo),
        },
      ]}>
      <Text style={[FontStyle.H2_semibold, {color: COLORS.neutral_600}]}>
        GREAT JOB!
      </Text>
      <Text
        style={[
          FontStyle.h4,
          {
            color: COLORS.neutral_600,
            textAlign: 'center',
            marginTop: '5%',
          },
        ]}>
        {values[cameFrom].text}
      </Text>
    </GameWrapper>
  );
};

export default Transition;
