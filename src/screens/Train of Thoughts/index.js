import React from 'react';
import {TrainOfThoughtsProvider} from '../../providers/TrainOfThoughts.Provider';
import TrainOfThoughts from './TrainOfThoughts';

const Provider = ({navigation}) => {
  return (
    <TrainOfThoughtsProvider>
      <TrainOfThoughts navigation={navigation} />
    </TrainOfThoughtsProvider>
  );
};

export default Provider;
