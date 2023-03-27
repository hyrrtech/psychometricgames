import {Button} from '../components/Button';
import {GameWrapper} from '../components/GameWrapper';
import {COLORS} from '../values/Colors';
import {Text, StyleSheet} from 'react-native';
import balloonBG from '../assets/balloonBG.png';
import {FontStyle} from '../values/Font';

const values = {
  BART: {
    backgroundGradient: COLORS.balloonBGGradient,
    imageURL: balloonBG,
  },
};

const Transition = ({route, navigation}) => {
  const {state, cameFrom} = route.params;
  const currentLevel = state.level;
  const totalLevels = state.totalLevels;
  const navigateTo = currentLevel === totalLevels ? 'Home' : cameFrom;

  return (
    <GameWrapper
      imageURL={values[cameFrom].imageURL}
      backgroundGradient={values[cameFrom].backgroundGradient}
      controllerButtons={[
        <Button
          key="next_game"
          title="Next Game"
          style={styles.button}
          onPressIn={() => {
            navigation.navigate(navigateTo);
          }}
        />,
      ]}>
      <Text style={[FontStyle.h3, {color: COLORS.textPrimary}]}>
        CONGRATULATIONS
      </Text>
      <Text
        style={[
          FontStyle.h4,
          {color: COLORS.textPrimary, textAlign: 'center', marginTop: '5%'},
        ]}>
        You have completed {currentLevel}/{totalLevels} part of the game. Press
        next game to play further
      </Text>
    </GameWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.textSecondary,
    borderRadius: 10,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },
});
export default Transition;
