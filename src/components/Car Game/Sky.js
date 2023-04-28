import {View, Dimensions} from 'react-native';
const Sky = () => {
  const {height} = Dimensions.get('window');
  const skyHeight = (height * 25) / 100;

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        height: skyHeight,
        width: '100%',
        zIndex: 10,
      }}></View>
  );
};

export default Sky;
