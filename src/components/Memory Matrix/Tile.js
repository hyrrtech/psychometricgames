import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Tile = ({props}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [clicked, setClicked] = useState(false);
  const {
    isCorrect,
    isSelected,
    isLastClick,
    remainingClickCount,
    correctScreenTime,
    lives,
    level,
  } = props;

  useEffect(() => {
    if (isCorrect && lives !== 0) {
      Animated.sequence([
        //revert animation of all toggled tiles
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }), //show correct tiles on game init
        Animated.delay(700),
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(correctScreenTime),
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [lives, level]);

  // show all correct tiles when the remainingClickCount is 0
  useEffect(() => {
    if (remainingClickCount === 0) {
      if (isCorrect)
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
    }
  }, [remainingClickCount]);

  //toggle the tile when it is clicked
  useEffect(() => {
    if (isSelected) {
      setClicked(true);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelected]);

  const frontAnimatedStyle = {
    transform: [
      {
        rotateX: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const backAnimatedStyle = {
    transform: [
      {
        rotateX: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.tileContainer}>
      <Animated.View style={[styles.tile, frontAnimatedStyle]}></Animated.View>
      <Animated.View
        style={[
          styles.tile,
          backAnimatedStyle,
          !clicked && isCorrect && {backgroundColor: '#f77f00'},
          clicked && isCorrect && {backgroundColor: '#f77f00'},
          clicked && isCorrect && isLastClick && {backgroundColor: '#0bc34d'},
          clicked && !isCorrect && isSelected && {backgroundColor: '#f24822'},
        ]}>
        {clicked && isLastClick && (
          <FontAwesomeIcon
            icon={isCorrect ? faCheck : faTimes}
            size={25}
            style={{color: 'white', borderWidth: 1}}
          />
        )}
        {clicked && isSelected && !isLastClick && !isCorrect && (
          <FontAwesomeIcon icon={faTimes} size={25} style={{color: 'white'}} />
        )}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  tileContainer: {
    height: 45,
    width: 45,
    margin: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    backgroundColor: '#003049',
    padding: 3,
  },
  tile: {
    width: '100%',
    height: '100%',
    backgroundColor: '#003049',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
  },
  backTile: {
    backgroundColor: '#003049',
    transform: [{rotateY: '180deg'}],
  },
});
export default Tile;
