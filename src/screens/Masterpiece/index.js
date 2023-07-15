import React from 'react';
import {MasterpieceProvider} from '../../providers/Masterpiece.Provider';
import Masterpiece from './Masterpiece';

const Provider = ({navigation}) => {
  return (
    <MasterpieceProvider>
      <Masterpiece navigation={navigation} />
    </MasterpieceProvider>
  );
};

export default Provider;
