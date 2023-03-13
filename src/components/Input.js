import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {GlobalStyles} from '../styles/GlobalStyles';
export const Input = props => {
  const {icon, iconColor, backgroundColor, textColor, ...restProps} = props;
  return (
    <View style={[styles.input, {backgroundColor: backgroundColor}]}>
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          size={20}
          style={{marginRight: '2%', color: iconColor}}
        />
      ) : null}
      <TextInput
        style={{
          color: textColor,
          fontSize: GlobalStyles.body.fontSize,
          width: '100%',
        }}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9,
    marginVertical: '1%',
    color: '#2A2740',
    fontFamily: 'Montaga',
    paddingHorizontal: '5%',
    paddingVertical: '1.2%',
  },
});
