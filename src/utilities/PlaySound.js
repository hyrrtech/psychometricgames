import Sound from 'react-native-sound';
export const PlaySound = file => {
  Sound.setCategory('Playback');
  var sound = new Sound(file, error => {
    if (error) {
      console.log(error);
      return;
    } else {
      sound.play(success => {
        if (!success) {
          console.log('Issue playing file');
        }
      });
    }
  });
  sound.setVolume(1);
  sound.release();
};
