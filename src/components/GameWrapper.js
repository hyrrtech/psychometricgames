import {View, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../values/Colors';

export const GameWrapper = ({
  imageURL,
  backgroundGradient,
  children,
  controllerButtons,
  scoreboard,
  level,
}) => {
  return (
    <LinearGradient style={{flex: 1}} colors={backgroundGradient}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'space-between',
          padding: '5%',
          zIndex: 0,
        }}
        source={imageURL}>
        <View style={styles.header}>
          <View style={styles.menu}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
              }}
            />
            {level}
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
              }}
            />
          </View>
          <View style={styles.scoreboard}>{scoreboard?.map(item => item)}</View>
        </View>

        <View style={styles.gameContainer}>{children}</View>
        <View style={styles.controllerButtons}>
          {controllerButtons?.map(button => button)}
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controllerButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  header: {
    width: '100%',
    flexDirection: 'column',
    zIndex: 1,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: '5%',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
