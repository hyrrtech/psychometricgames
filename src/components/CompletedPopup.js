import {View, Text, StyleSheet} from 'react-native';
import {Button} from './Button';
import {COLORS} from '../values/Colors';
import {useNavigation} from '@react-navigation/native';
import {FontStyle} from '../values/Font';

const CompletedPopup = ({gameName}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View />
      <View>
        <Text
          style={[
            FontStyle.h4,
            {color: COLORS.textPrimary, textAlign: 'center'},
          ]}>
          You have completed all levels of {gameName}!
        </Text>
        <Text
          style={[
            FontStyle.p,
            {color: COLORS.textPrimary, textAlign: 'center', marginTop: '5%'},
          ]}>
          Press Home to go back to the home screen.
        </Text>
      </View>
      <Button
        title="Home"
        style={styles.button}
        onPressIn={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: '5%',
    color: COLORS.textSecondary,
  },
});

export default CompletedPopup;
