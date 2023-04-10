import React from 'react';
import {TrainOfThoughtsProvider} from '../../providers/TrainOfThoughts.Provider';
import TrainOfThoughts from './TrainOfThoughts';

const Provider = () => {
  return (
    <TrainOfThoughtsProvider>
      <TrainOfThoughts />
    </TrainOfThoughtsProvider>
  );
};

export default Provider;
