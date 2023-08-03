import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLORS} from '../values/Colors';
import BackButtonIcon from '../assets/nav_icons/back_button.svg';
import {useNavigation} from '@react-navigation/native';
import {FontStyle} from '../values/Font';

export const GameWrapper = ({
  imageURL,
  backgroundGradient,
  children,
  controllerButtons,
  scoreboard,
  showBackButton = true,
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'space-between',
        padding: '1%',
        flexDirection: 'column',
        zIndex: 12,
      }}
      source={imageURL}>
      <View style={[styles.overlay, {backgroundColor: backgroundGradient}]} />
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.menu}>
            <View pointerEvents="none">
              <BackButtonIcon
                width={40}
                height={40}
                fill={COLORS.neutral_600}
              />
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.scoreboardContainer}>
          {scoreboard?.map((item, index) => (
            <View key={index} style={styles.scoreboard}>
              <Text style={styles.text}>{item.title}: </Text>
              <Text style={styles.text}> {item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.gameContainer}>{children}</View>

      {/* bottom */}
      <View style={styles.buttonsContainer}>
        {controllerButtons?.map(button => (
          <TouchableOpacity
            key={button.title}
            style={styles.button}
            onPress={button.onPress}>
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  gameContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // opacity: 0.3,
    zIndex: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  menu: {
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary_100,
  },
  scoreboardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scoreboard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginLeft: '1.5%',
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '5%',
  },
  text: {
    ...FontStyle.H5_semibold,
    color: COLORS.neutral_600,
    textTransform: 'uppercase',
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  button: {
    flex: 1,
    // paddingHorizontal: '2%',
    paddingVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2.5,
  },
  buttonText: {
    ...FontStyle.H5_semibold,
    color: COLORS.neutral_600,
    textTransform: 'uppercase',
  },
});
