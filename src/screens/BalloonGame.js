import React, {useRef, useState} from 'react';
import {Animated, View, Dimensions, StyleSheet} from 'react-native';
import Svg from 'react-native-svg';
import InflatingBalloon from '../components/Balloon/InflatingBalloon';
import PoppedBalloon from '../components/Balloon/PoppedBalloon';
import {GameWrapper} from '../components/GameWrapper';
import {COLORS} from '../values/Colors';
import balloonBG from '../assets/balloonBG.png';
import {Button} from '../components/Button';
import {InfoLabel} from '../components/InfoLabel';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BalloonGame = props => {
  const heightLimit = windowHeight / 1.5;
  const scalingFactor =
    windowHeight > windowWidth
      ? (windowHeight / windowWidth) * 10
      : (windowWidth / windowHeight) * 10;

  const sizeAnimation = useRef(new Animated.Value(scalingFactor * 15)).current;
  const [gameOver, setGameOver] = useState(false);

  const handlePress = () => {
    //check if height is exeeded
    console.log(sizeAnimation._value, heightLimit);
    if (sizeAnimation._value >= heightLimit) {
      console.log('height exeeded');
      setGameOver(true);
    }

    Animated.spring(sizeAnimation, {
      toValue: sizeAnimation._value + scalingFactor,
      bounciness: 20,
      speed: 2,
      useNativeDriver: false,
    }).start();
  };

  return (
    <GameWrapper
      imageURL={balloonBG}
      backgroundGradient={COLORS.balloonBGGradient}
      scoreboard={[
        <InfoLabel
          label={'Time'}
          value={'1:30'}
          style={styles.infoLabel}
          key="time"
        />,
        <InfoLabel
          label={'Score'}
          value={'1500'}
          style={styles.infoLabel}
          key="score"
        />,
      ]}
      level={<InfoLabel label={'Level 2'} style={styles.infoLabel} />}
      controllerButtons={[
        <Button
          key="pump"
          title="Pump"
          style={styles.button}
          onPressIn={handlePress}
        />,
        <Button key="collect" title="Collect" style={styles.button} />,
      ]}>
      <AnimatedSvg
        width={sizeAnimation}
        height={sizeAnimation}
        viewBox={`0 0 287 349`}
        fill="none">
        {gameOver ? <PoppedBalloon /> : <InflatingBalloon />}
      </AnimatedSvg>
    </GameWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: COLORS.primary,
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(7, 94, 84, 0.16)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '8%',
    paddingVertical: '2.5%',
  },
  infoLabel: {
    borderColor: 'rgba(84, 214, 234, 1)',
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(84, 214, 234, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '8%',
    paddingVertical: '2%',
  },
});
export default BalloonGame;
