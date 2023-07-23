import {Animated, View, StyleSheet, Dimensions} from 'react-native';
import {useEffect, useMemo, useRef} from 'react';

const {height} = Dimensions.get('window');
const containerHeight = height * 0.2;
const BaitContainerHeight = containerHeight * 0.22;
const TimerContainerSize = containerHeight * 0.5;
const TimeElementSize = TimerContainerSize * 0.8;

const baitSize = BaitContainerHeight * 0.7;

const Baits = ({baitCount}) => {
  const originalBaitCount = useMemo(() => baitCount, []);
  const scaleAnimations = useMemo(
    () => new Array(originalBaitCount).fill(1).map(() => new Animated.Value(1)),
    [originalBaitCount],
  );

  useEffect(() => {
    if (baitCount < originalBaitCount) {
      const lastElementIndex = baitCount;
      if (lastElementIndex >= 0 && lastElementIndex < scaleAnimations.length) {
        Animated.timing(scaleAnimations[lastElementIndex], {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [baitCount, originalBaitCount, scaleAnimations]);

  return (
    <View style={styles.baitContainer}>
      {scaleAnimations.map((scaleAnimation, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bait,
            {
              marginLeft: baitSize * 0.2,
              marginRight: baitSize * 0.2,
              transform: [{scale: scaleAnimation}],
            },
          ]}></Animated.View>
      ))}
    </View>
  );
};

const Deck = ({baitCount}) => {
  const containerWidth = useMemo(
    () =>
      baitCount * baitSize +
      baitCount * baitSize * 0.4 +
      BaitContainerHeight / 2,

    [],
  );
  const TimeContainerCenterX = containerWidth / 2 - TimerContainerSize / 2;
  useEffect(() => {}, [baitCount]);

  return (
    <View style={[styles.container, {width: containerWidth}]}>
      <View
        style={[styles.timeContainerBGSquare, {left: TimeContainerCenterX}]}
      />

      <Baits baitCount={baitCount} />

      <View style={[styles.timeContainer, {left: TimeContainerCenterX}]}>
        <View
          style={{
            borderRadius: TimeElementSize / 2,
            backgroundColor: 'white',
            height: TimeElementSize,
            width: TimeElementSize,
          }}>
          <View
            style={{
              backgroundColor: 'orange',
              borderRadius: TimeElementSize / 2,
              height: TimeElementSize,
              width: TimeElementSize,
            }}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
  },
  baitContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    // justifyContent: 'space',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#77aaac',
    height: BaitContainerHeight,
    borderTopLeftRadius: BaitContainerHeight / 1.5,
    borderTopRightRadius: BaitContainerHeight / 1.5,
    width: '100%',
    paddingLeft: BaitContainerHeight / 4,
    paddingRight: BaitContainerHeight / 4,
  },
  bait: {
    backgroundColor: '#b8b5b8',
    borderRadius: (BaitContainerHeight * 0.7) / 2,
    height: BaitContainerHeight * 0.7,
    width: BaitContainerHeight * 0.7,
  },
  timeContainerBGSquare: {
    position: 'absolute',
    height: TimerContainerSize,
    width: TimerContainerSize,
    bottom: BaitContainerHeight * 0.9,
    borderTopLeftRadius: TimerContainerSize,
    borderTopRightRadius: TimerContainerSize,
    backgroundColor: '#77aaac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    position: 'absolute',
    bottom: BaitContainerHeight * 0.9,
    borderRadius: TimerContainerSize / 2,
    backgroundColor: '#77aaac',
    height: TimerContainerSize,
    width: TimerContainerSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deck;
