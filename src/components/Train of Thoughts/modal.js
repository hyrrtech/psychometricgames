import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {FontStyle} from '../../values/Font';
import {COLORS} from '../../values/Colors';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Modal = ({content, onPress, style, showContinue = true}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.container,
        {
          ...style,
        },
      ]}>
      <Text style={styles.text}>{content}</Text>
      {showContinue && <Text style={styles.text2}>Tap to Continue</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FED7D7',
    padding: 20,
    borderRadius: 5,
    maxWidth: windowWidth * 0.7,
  },
  text: {
    color: COLORS.neutral_500,
    ...FontStyle.h4,
  },
  text2: {
    color: COLORS.neutral_500,
    ...FontStyle.H5_bold,
    alignSelf: 'center',
  },
});

export default Modal;
