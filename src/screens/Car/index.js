import React from 'react';
import {CarGameProvider} from '../../providers/CarGame.Provider';
import CarGame from './CarGame';

const Provider = ({navigation}) => {
  return (
    <CarGameProvider>
      <CarGame navigation={navigation} />
    </CarGameProvider>
  );
};

export default Provider;
