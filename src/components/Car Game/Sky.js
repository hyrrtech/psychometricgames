import {View, Dimensions} from 'react-native';
const Sky = ({skyHeight}) => {
  return (
    <View
      style={{
        backgroundColor: '#c4f8db',
        height: skyHeight,
        width: '100%',
        zIndex: 10,
      }}></View>
  );
};

export default Sky;
