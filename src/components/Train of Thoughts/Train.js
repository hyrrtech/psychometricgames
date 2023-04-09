import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
export const Train = ({path, totalDistance}) => {
  const fps = 60;
  const interval = 1000 / fps;
  const speed = 50;
  const [trainPosition, setTrainPosition] = useState({x: 75, y: 75});

  useEffect(() => {
    const duration = (totalDistance / speed) * 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed <= duration) {
        const progress = elapsed / duration;
        const distance = totalDistance * progress;
        let distanceSoFar = 0;
        let segmentLength;
        let startPoint = path[0];
        let endPoint;
        for (let i = 1; i < path.length; i++) {
          endPoint = path[i];
          segmentLength = Math.sqrt(
            Math.pow(endPoint.x - startPoint.x, 2) +
              Math.pow(endPoint.y - startPoint.y, 2),
          );
          if (distanceSoFar + segmentLength > distance) {
            break;
          }
          distanceSoFar += segmentLength;
          startPoint = endPoint;
        }

        const segmentProgress = distance - distanceSoFar;

        const dx =
          (endPoint.x - startPoint.x) * (segmentProgress / segmentLength);
        const dy =
          (endPoint.y - startPoint.y) * (segmentProgress / segmentLength);

        const offsetX = -25;
        const offsetY = -25;
        const newTrainPosition = {
          x: startPoint.x + dx + offsetX,
          y: startPoint.y + dy + offsetY,
        };
        setTrainPosition(newTrainPosition);
        setTimeout(animate, interval);
      }
    };
    setTimeout(animate, interval);
  }, []);

  return (
    <View
      style={{
        height: 50,
        width: 50,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        left: trainPosition.x,
        top: trainPosition.y,
      }}>
      <Text>{`x: ${Math.floor(trainPosition.x)}, y: ${Math.floor(
        trainPosition.y,
      )}`}</Text>
    </View>
  );
};
