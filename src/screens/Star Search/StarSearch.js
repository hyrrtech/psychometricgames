import {
  constants,
  generateShapeData,
  getShapePositions,
} from '../../utilities/Star Search';
import Shape from '../../components/Star Search/Shape';
import {View} from 'react-native';

const StarSearch = () => {
  const {spawnAreaHeight, spawnAreaWidth} = constants;
  const shapePositions = getShapePositions(20);
  const shapeStyles = generateShapeData(20, 3, 2, 1, false, false, true);

  const combinePositionAndStyle = (shapePositions, shapeStyles) => {
    let combinedArray = [];
    let j = 0;
    for (let [key, value] of shapeStyles) {
      for (let k = 0; k < value.count; k++) {
        combinedArray.push({
          position: shapePositions[j].position,
          id: shapePositions[j].id,
          ...value,
        });
        j++;
      }
    }

    return combinedArray;
  };

  const shapeData = combinePositionAndStyle(shapePositions, shapeStyles);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b5256',
      }}>
      <View
        style={{
          height: spawnAreaHeight,
          width: spawnAreaWidth,
          borderWidth: 1,
        }}>
        {shapeData.map(shape => (
          <Shape
            key={shape.id}
            id={shape.id}
            hasPattern={shape.hasPattern}
            initialRotationAngle={shape.initialRotationAngle}
            rotationAnimation={shape.rotationAnimation}
            color={shape.color}
            shape={shape.shape}
            position={shape.position}
            count={shape.count}
          />
        ))}
      </View>
    </View>
  );
};

export default StarSearch;
