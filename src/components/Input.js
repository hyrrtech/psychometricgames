import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FontStyle} from '../values/Font';
export const Input = props => {
  const {icon, iconColor, style, textColor, ...restProps} = props;
  return (
    <View style={[styles.input, style]}>
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          size={20}
          style={{marginRight: '2%', color: iconColor}}
        />
      ) : null}
      <TextInput
        style={[
          FontStyle.p,
          {
            color: textColor,
            width: '100%',
          },
        ]}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
    paddingHorizontal: '5%',
    paddingVertical: '1.2%',
    overflow: 'hidden',
  },
});
