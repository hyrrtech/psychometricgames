import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {COLORS, FontStyle} from '../values';

const data = [
  {
    title: 'Balloon',
    navigateTo: 'BART',
    subtitle: 'Decision Taking',
    imageUri: require('../assets/games_logo/bart.png'),
  },
  {
    title: 'Pirate Passage',
    navigateTo: 'PiratePassage',
    subtitle: 'Problem Solving',
    imageUri: require('../assets/games_logo/pirate_passage.png'),
  },
  {
    title: 'Memory Matrix',
    navigateTo: 'MemoryMatrix',
    subtitle: 'Spatial Recall',
    imageUri: require('../assets/games_logo/memory_matrix.png'),
  },
  {
    title: 'Shark',
    navigateTo: 'SHARK',
    subtitle: 'Flexibility',
    imageUri: require('../assets/games_logo/fish.png'),
  },
  // {
  //   title: 'Kill the Spider',
  //   navigateTo: 'KillTheSpider',
  //   subtitle: 'Shark',
  //   imageUri: require('../assets/games_logo/pirate_passage.png'),
  // },
  // {
  //   title: 'Car Race',
  //   navigateTo: 'CarGame',
  //   subtitle: '',
  //   imageUri: require('../assets/games_logo/pirate_passage.png'),
  // },
  {
    title: 'Train Of Thoughs',
    navigateTo: 'TrainOfThoughts',
    subtitle: 'Attention',
    imageUri: require('../assets/games_logo/train_of_thoughs.png'),
  },
  {
    title: 'Color Match',
    navigateTo: 'ColorMatch',
    subtitle: 'Flexibility',
    imageUri: require('../assets/games_logo/color_match.png'),
  },
  {
    title: 'Feed The Fish',
    navigateTo: 'FishGame',
    subtitle: 'Attention',
    imageUri: require('../assets/games_logo/fish_food.png'),
  },
  {
    title: 'Fuse Wire',
    navigateTo: 'FuseWire',
    subtitle: 'Problem Solving',
    imageUri: require('../assets/games_logo/fuse_wire.png'),
  },
  {
    title: 'Frog Jump',
    navigateTo: 'FrogJump',
    subtitle: 'Attention',
    imageUri: require('../assets/games_logo/frog_jump.png'),
  },
  {
    title: 'Masterpiece',
    navigateTo: 'Masterpiece',
    subtitle: 'Problem Solving',
    imageUri: require('../assets/games_logo/masterpiece.png'),
  },
  {
    title: 'Star Search',
    navigateTo: 'StarSearch',
    subtitle: 'Selective Attention',
    imageUri: require('../assets/games_logo/star_search.png'),
  },
];

const Games = ({navigation}) => {
  const Header = ({title}) => {
    return <Text style={styles.headerText}>{title}</Text>;
  };

  const Item = ({props}) => {
    const {title, navigateTo, subtitle, imageUri} = props;
    const width = (Dimensions.get('window').width - 4 * 10) / 2;
    return (
      <View style={[styles.container, {width: width}]}>
        <View style={styles.imageContainer}>
          <Image source={imageUri} style={styles.image} />
        </View>

        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.subtitle}>{subtitle}</Text> */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate(navigateTo)}
          style={styles.button}>
          <Text style={styles.buttonText}>Start Playing</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <FlatList
        style={{margin: '2%'}}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          flexShrink: 1,
          justifyContent: 'space-between',
          marginBottom: '1%',
        }}
        data={data}
        ListHeaderComponent={<Header title="All Games" />}
        keyExtractor={item => item.navigateTo}
        renderItem={object => <Item props={object.item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    ...FontStyle.H3_bold,
    color: COLORS.neutral_700,
    marginVertical: '2%',
  },
  container: {
    margin: '1%',
    // flex: 1,
    padding: '3%',
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: COLORS.neutral_100,
    shadowColor: COLORS.neutral_700,
  },
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: '5%',
  },
  image: {flex: 1, width: null, height: null, resizeMode: 'stretch'},
  button: {
    borderRadius: 3,
    backgroundColor: COLORS.primary_100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '4%',
  },
  buttonText: {
    ...FontStyle.Title_8,
    color: COLORS.neutral_100,
  },

  subtitle: {
    ...FontStyle.H5,
    color: COLORS.neutral_500,
    width: '100%',
  },
  title: {
    ...FontStyle.H4_bold,
    color: COLORS.neutral_600,
    width: '100%',
    marginVertical: '5%',
  },
});
export default Games;
