import {View, Image, StyleSheet} from 'react-native';
import fish from '../../assets/fish.png';

const SharkMatrix = ({matrix}) => {
  return (
    <View style={styles.container}>
      {matrix.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((col, j) => (
            <View
              key={j}
              style={[
                styles.item,
                {transform: [{rotateY: col === 'RIGHT' ? '0deg' : '180deg'}]},
              ]}>
              {col ? (
                <Image
                  source={fish}
                  resizeMode="contain"
                  style={{width: '100%'}}
                />
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: '5%',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  item: {flex: 0.25, marginHorizontal: '0.5%', marginVertical: '-0.5%'},
});
export default SharkMatrix;
