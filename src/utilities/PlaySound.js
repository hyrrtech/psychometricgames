import Sound from 'react-native-sound';
const PlaySound = file => {
  Sound.setCategory('Playback');
  var sound = new Sound(file, error => {
    if (error) {
      console.log(error);
      return;
    } else {
      sound.play(success => {
        if (success) {
          sound.release();
        } else {
          console.log('Issue playing file');
        }
      });
    }
  });
};
export default PlaySound;
