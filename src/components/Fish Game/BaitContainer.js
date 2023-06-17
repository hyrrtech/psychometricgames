import {View} from 'react-native';

const Bait = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        borderRadius: 100,
        height: 50,
        width: 50,
      }}></View>
  );
};

const BaitContainer = ({number_of_bait}) => {
  console.log(number_of_bait);
  const bait = [];
  for (let i = 0; i < number_of_bait; i++) {
    bait.push(<Bait key={i} />);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: '50%',
        width: '100%',
      }}>
      {bait}
    </View>
  );
};

export default BaitContainer;
