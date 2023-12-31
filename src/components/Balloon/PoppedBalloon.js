import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Path, Ellipse, G} from 'react-native-svg';
import {PlaySound} from '../../utilities/';
import balloon_pop from '../../assets/sounds/balloon_pop.wav';
import adjustHexColor from '../../utilities/adjustHexColor';

const AnimatedG = Animated.createAnimatedComponent(G);
const PoppedBalloon = ({balloonColor}) => {
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const {lightened} = adjustHexColor(balloonColor, 20, 20);

  useEffect(() => {
    PlaySound(balloon_pop);
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AnimatedG style={{opacity: opacityAnimation}}>
      <Path
        d="M144.056 220.975C143.446 219.397 145.298 217.05 149.324 216.22C150.689 216.146 153.392 215.284 153.29 212.422"
        stroke="#6C6C6C"
      />
      <Path
        d="M137.034 215.79C135.958 214.529 135.871 212.7 136.82 211.342C137.876 209.833 139.892 209.349 141.517 210.216L149.936 214.707C150.343 214.924 150.72 215.191 151.059 215.503L152.68 216.991C154.774 218.913 155.023 222.128 153.25 224.349C151.278 226.821 147.615 227.082 145.313 224.913L142.782 222.53L137.034 215.79Z"
        fill={balloonColor}
      />
      <Ellipse
        cx={150.731}
        cy={222.048}
        rx={3.5}
        ry={5.13608}
        transform="rotate(39.4527 150.731 222.048)"
        fill={lightened}
      />
      <Path
        d="M142.266 221.045C142.266 221.045 135.863 245.115 144.205 259.666C152.547 274.216 166.952 277.286 166.239 293.441C165.525 309.596 168.726 319.007 168.726 319.007"
        stroke="#6C6C6C"
      />
      <Path
        d="M142.225 221.154C141.85 219.189 144.753 216.802 150.011 216.612C151.742 216.79 155.348 216.305 155.927 212.937"
        stroke="#6C6C6C"
      />
      <Path
        d="M87.6954 91.7824L79.6954 88.1223L76.6954 97.7824L64.1954 91.7824C65.6954 84.7824 72.944 80.722 79.6954 76.7824L87.6954 91.7824Z"
        fill={balloonColor}
      />
      <Path
        d="M48.1642 144.097C47.5853 139.777 40.8687 141.215 40.8687 130.597C40.8687 124.691 32.1642 123.097 40.8687 124.097L114.164 130.597L48.1642 144.097Z"
        fill={balloonColor}
      />
      <Path
        d="M95.6644 216.382C87.6963 214.216 87.7242 203.077 80.6954 199.097L144.54 145.198L95.6644 216.382Z"
        fill={balloonColor}
      />
      <Path
        d="M203.164 193.597C194.664 199.336 200.8 212.129 179.802 216.382L170.945 192.084L190.133 207.541L161.664 164.519L203.164 193.597Z"
        fill={balloonColor}
      />
      <Path
        d="M246.572 111.031C250.664 121.597 245.862 137.292 236.072 149.531L220.164 141.215L185.664 127.031L222.352 127.978L205.198 116.909L228.664 116.097L246.572 111.031Z"
        fill={balloonColor}
      />
      <Path
        d="M203.164 67.2825C207.911 73.4538 207.563 73.5782 210.757 80.7825L188.257 99.2825L203.164 67.2825Z"
        fill={balloonColor}
      />
      <Path
        d="M136.706 30.0245C139.005 29.864 141.326 29.7824 143.665 29.7824C156.404 29.7824 168.577 32.2004 179.752 36.6025L161.664 99.2824L157.009 53.9146L153.184 73.9683L136.706 30.0245Z"
        fill={balloonColor}
      />
      <Path
        d="M82.4146 35.3236C90.9142 31.0632 98.7208 23.859 101.914 31.0632L108.914 72.5056L82.4146 35.3236Z"
        fill={balloonColor}
      />
      <Path
        d="M197.164 149.531C197.164 158.132 195.664 152.632 192.664 159.031L169.164 139.031L197.164 149.531Z"
        fill={balloonColor}
      />
    </AnimatedG>
  );
};
export default PoppedBalloon;
