import {View} from 'react-native';
import Ripple from './Ripple';

const RainDrop = ({position, interval}) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="none">
      {/* outer  */}
      <Ripple initialScale={0.4} finalScale={1} delay={0} interval={interval} />
      {/* inner  */}
      <Ripple
        initialScale={0.2}
        finalScale={1}
        delay={200}
        interval={interval}
      />
    </View>
  );
};

export default RainDrop;
