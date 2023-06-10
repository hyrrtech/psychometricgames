import React from 'react';
import {FuseWireProvider} from '../../providers/FuseWire.Provider';
import FuseWire from './FuseWire';

const Provider = ({navigation}) => {
  return (
    <FuseWireProvider>
      <FuseWire navigation={navigation} />
    </FuseWireProvider>
  );
};

export default Provider;
