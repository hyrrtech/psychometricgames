import {View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../values/Colors';

export const BackgroundWrapper = ({imageURL, children}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          flex: 1,
          height: '50%',
        }}
        source={imageURL}>
        <LinearGradient style={{flex: 1}} colors={COLORS.gradient}>
          {children}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
