import React from 'react';
import {FrogGameProvider} from '../../providers/FrogGame.Provider';
import FrogGame from './FrogJump';

const Provider = ({navigation}) => {
  return (
    <FrogGameProvider>
      <FrogGame navigation={navigation} />
    </FrogGameProvider>
  );
};

export default Provider;
