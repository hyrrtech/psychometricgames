import React from 'react';
import {FishGameProvider} from '../../providers/FishGame.Provider';
import FishGame from './FishGame';

const Provider = ({navigation}) => {
  return (
    <FishGameProvider>
      <FishGame navigation={navigation} />
    </FishGameProvider>
  );
};

export default Provider;
