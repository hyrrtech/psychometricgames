import {View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export const BackgroundWrapper = ({imageURL, children}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          flex: 1,
          width: null,
          height: '50%',
        }}
        source={imageURL}>
        <LinearGradient
          style={{flex: 1}}
          colors={['rgba(255, 255, 255, 0.1)', 'rgb(84, 214, 234)']}
          locations={[0, 0.9]}>
          {children}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
