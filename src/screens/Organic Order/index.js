import React from 'react';
import {OrganicOrderProvider} from '../../providers/OrganicOrder.Provider';
import OrganicOrder from './OrganicOrder';

const Provider = ({navigation}) => {
  return (
    <OrganicOrderProvider>
      <OrganicOrder navigation={navigation} />
    </OrganicOrderProvider>
  );
};

export default Provider;
