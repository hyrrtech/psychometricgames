import {View, TouchableOpacity, Text, Animated, Dimensions} from 'react-native';
import {useRef} from 'react';
const {width, height} = Dimensions.get('screen');
const tileSize = (height / width) * 30;

const Tile = ({tileSize, position, index}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{
          height: tileSize,
          width: tileSize,
          position: 'absolute',
          backgroundColor: '#64d7dc',
          left: position.x - tileSize / 2,
          top: position.y - tileSize / 2,
        }}>
        <Text>
          [{index.i},{index.j}]
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          position: 'absolute',
          left: position.x - 5 / 2,
          top: position.y - 5 / 2,
          height: 5,
          width: 5,
          opacity: opacity,
          backgroundColor: 'black',
        }}></Animated.View>
    </>
  );
};

const generateMatrix = (row, col) => {
  const gap = (height / width) * 2;
  const totalWidth = tileSize * col + gap * (col - 1);
  const totalHeight = tileSize * row + gap * (row - 1);
  const intialX = width / 2 - totalWidth / 2 + tileSize / 2;
  const intialY = height / 2 - totalHeight / 2 + tileSize / 2;

  const matrix = [];
  for (let i = 0; i < row; i++) {
    const row = [];
    for (let j = 0; j < col; j++) {
      row.push({
        position: {
          x: intialX + j * (tileSize + gap),
          y: intialY + i * (tileSize + gap),
        },
        index: {i, j},
      });
    }
    matrix.push(row);
  }
  return matrix;
};

const PiratePassage = () => {
  const matrix = generateMatrix(7, 5);
  return (
    <View style={{flex: 1, backgroundColor: '#79eff2'}}>
      {matrix.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          return (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              tileSize={tileSize}
              index={tile.index}
              position={tile.position}
            />
          );
        });
      })}
    </View>
  );
};

export default PiratePassage;
