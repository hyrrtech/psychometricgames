import {View, Animated} from 'react-native';
import {adjustCoordinates, constants} from '../../utilities/Train of Thoughts/';
import StationBackSvg from './SVG/StationBackSvg';
import StationFrontSvg from './SVG/StationFrontSvg';
import StationLeftSvg from './SVG/StationLeftSvg';
import {useContext, useEffect, useRef} from 'react';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';

const {pathSize, stationSize} = constants;
const Station = (point, prevPoint) => {
  const {demoState, showDemo} = useContext(TrainOfThoughtsContext);
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  point = adjustCoordinates(point);
  prevPoint = adjustCoordinates(prevPoint);
  const deltaX = point.x - prevPoint.x;
  const deltaY = point.y - prevPoint.y;
  let direction = Math.ceil((Math.atan2(deltaY, deltaX) * 180) / Math.PI);
  let stepX = point.x;
  let stepY = point.y;

  if (direction === -90) {
    stepX = stepX - pathSize / 2;
  }
  if (direction === 0 || direction < -90 || direction === 180) {
    stepX = stepX - pathSize;
    stepY = stepY - pathSize;
  }
  if (direction === 90) {
    stepX = stepX - pathSize / 2;
    stepY = stepY - pathSize;
  }

  useEffect(() => {
    if (showDemo && demoState.trainColor === point.color) {
      Animated.loop(
        Animated.spring(scaleAnimation, {
          toValue: 1.05,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      scaleAnimation.setValue(1);
    }
  }, [showDemo]);

  return (
    <Animated.View
      key={`${stepX}-${stepY}-destination`}
      style={{
        position: 'absolute',
        zIndex: 999,
        left: stepX,
        top: stepY,
        transform: [{scale: scaleAnimation}],
      }}>
      {direction === -90 && (
        <StationFrontSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
      {(direction === 0 || direction < -90 || direction === 180) && (
        <StationLeftSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
      {direction === 90 && (
        <StationBackSvg
          height={stationSize}
          width={stationSize}
          color={point.color}
        />
      )}
    </Animated.View>
  );
};
export default Station;
