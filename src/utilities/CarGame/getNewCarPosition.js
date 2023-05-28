import constants from './constants';
const {carCenterXPosition, carLeftXPosition, carRightXPosition} = constants;
const getNewCarPosition = (carPosition, to) => {
  if (carPosition === 'center' && to === 'left')
    return {translateValue: carLeftXPosition, newPosition: 'left'};

  if (carPosition === 'center' && to === 'right')
    return {translateValue: carRightXPosition, newPosition: 'right'};

  if (carPosition === 'left' && to === 'right')
    return {translateValue: carCenterXPosition, newPosition: 'center'};

  if (carPosition === 'right' && to === 'left')
    return {translateValue: carCenterXPosition, newPosition: 'center'};
};

export default getNewCarPosition;
