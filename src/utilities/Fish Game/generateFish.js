import newToValue from './newToValue';
import getNewAngle from './getNewAngle';
const generateFish = number_of_fishes => {
  const fishes = [];
  for (let i = 0; i < number_of_fishes; i++) {
    const initialFromValue = newToValue();
    const initialToValue = newToValue();
    const rotateFrom = getNewAngle(initialFromValue, initialToValue);
    fishes.push({id: i, initialFromValue, initialToValue, rotateFrom});
  }
  return fishes;
};

export default generateFish;
