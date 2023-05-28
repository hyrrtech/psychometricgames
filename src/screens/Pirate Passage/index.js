import React from 'react';
import {PiratePassageProvider} from '../../providers/PiratePassage.Provider';
import PiratePassage from './PiratePassage';

const Provider = ({navigation}) => {
  return (
    <PiratePassageProvider>
      <PiratePassage navigation={navigation} />
    </PiratePassageProvider>
  );
};

export default Provider;
