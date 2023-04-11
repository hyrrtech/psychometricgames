import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Train} from '../../components/Train of Thoughts/Train';
import {TrainOfThoughtsContext} from '../../providers/TrainOfThoughts.Provider';
import Track from '../../components/Train of Thoughts/SVG/Track';
const TrainOfThoughts = () => {
  const {trains, setPath, path} = useContext(TrainOfThoughtsContext);
  console.log(trains, 'trains');
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {path.map((point, index, points) => {
          if (index === points.length - 1) {
            return null; // Skip last point
          }

          const nextPoint = points[index + 1];
          const deltaX = nextPoint.x - point.x;
          const deltaY = nextPoint.y - point.y;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const direction = Math.atan2(deltaY, deltaX);
          const stepSize = 15;
          const numSteps = Math.ceil(distance / stepSize);

          return Array.from({length: numSteps}, (_, i) => {
            const stepX = point.x + (i + 1) * (deltaX / numSteps);
            const stepY = point.y + (i + 1) * (deltaY / numSteps);

            return (
              <View
                key={`${index}-${i}`}
                style={[
                  styles.path,
                  {
                    left: stepX,
                    top: stepY,
                    transform: [{rotate: `${direction}rad`}],
                  },
                ]}>
                <Track height={20} width={20} />
              </View>
            );
          });
        })}
      </View>

      {trains.map((train, index) => (
        <Train key={train} id={index} />
      ))}
      <Button
        title="change path"
        onPress={() => {
          const newPath = [...path];
          newPath[path.length - 2] = {x: 300, y: 300};
          setPath(newPath);
        }}
      />
    </View>
  );
};

export default TrainOfThoughts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  path: {
    position: 'absolute',
  },
});
