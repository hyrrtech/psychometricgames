import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../values/Colors';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';

export const GameWrapper = ({
  imageURL,
  backgroundGradient,
  children,
  controllerButtons,
  scoreboard,
  level,
}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient style={{flex: 1}} colors={backgroundGradient}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          padding: '5%',
          zIndex: 0,
        }}
        source={imageURL}>
        <View style={styles.header}>
          <View style={styles.menu}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
              style={{
                borderRadius: 50,
                padding: '2%',
                backgroundColor: COLORS.primary,
              }}>
              <FontAwesomeIcon
                icon={faBars}
                size={25}
                style={{color: COLORS.textSecondary}}
              />
            </TouchableOpacity>
            {level}
            <View style={{width: 25}} />
          </View>
          <View style={styles.scoreboard}>{scoreboard?.map(item => item)}</View>
        </View>

        <View style={styles.gameContainer}>{children}</View>
        <View style={styles.controllerButtons}>
          {controllerButtons?.map(button => button)}
        </View>
      </View>
    </LinearGradient>
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
