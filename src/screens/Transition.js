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
      backgroundGradient: COLORS.balloonBGGradient,
      imageURL: BackgroundImage.BART,
      navigateTo: currentLevel === totalLevels ? 'Home' : 'BART',

      navigateButtonText: currentLevel === totalLevels ? 'Home' : 'Next Level',
      text:
        currentLevel === totalLevels
          ? 'You have completed the game. Press home to go back to home screen'
          : `You have completed ${currentLevel}/${totalLevels} part of the game. Press next game to play further`,
    },
    SHARK: {
      backgroundGradient: COLORS.sharkBGGrandient,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Home',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    MemoryMatrix: {
      backgroundGradient: COLORS.memoryMatrixBGGradient,
      imageURL: BackgroundImage.MemoryMatrix,
      navigateTo: 'Home',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press Home to go back to home screen',
    },
    KillTheSpider: {
      backgroundGradient: COLORS.killTheSpiderBGGradient,
      imageURL: BackgroundImage.KillTheSpider,
      navigateTo: 'Home',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press Home to go back to home screen',
    },
    TrainOfThoughts: {
      backgroundGradient: COLORS.trainOfThoughtsBGGradient,
      imageURL: BackgroundImage.TrainofThoughts,
      navigateTo: currentLevel === totalLevels ? 'Home' : 'TrainOfThoughts',

      navigateButtonText: currentLevel === totalLevels ? 'Home' : 'Next Level',
      text:
        currentLevel === totalLevels
          ? 'You have completed the game. Press home to go back to home screen'
          : `You have completed ${currentLevel}/${totalLevels} part of the game. Press next game to play further`,
    },
    ColorMatch: {
      backgroundGradient: COLORS.sharkBGGrandient,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Home',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    FrogJump: {
      backgroundGradient: COLORS.sharkBGGrandient,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Home',
      navigateButtonText: 'Home',
      text: 'You have completed the game. Press home to go back to home screen',
    },
    FuseWire: {
      backgroundGradient: COLORS.sharkBGGrandient,
      imageURL: BackgroundImage.SHARK,
      navigateTo: 'Home',
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
      backgroundGradient={values[cameFrom].backgroundGradient}
      controllerButtons={[
        <Button
          key="next_game"
          title={values[cameFrom].navigateButtonText}
          style={styles.button}
          onPressIn={() => {
            navigation.navigate(values[cameFrom].navigateTo);
          }}
        />,
      ]}>
      <Text style={[FontStyle.h3, {color: COLORS.textSecondary}]}>
        CONGRATULATIONS
      </Text>
      <Text
        style={[
          FontStyle.h4,
          {
            color: COLORS.textSecondary,
            textAlign: 'center',
            marginTop: '5%',
          },
        ]}>
        {values[cameFrom].text}
      </Text>
    </GameWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    color: COLORS.textSecondary,
  },
});
export default Transition;
