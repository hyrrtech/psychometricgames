import React from 'react';
import {StarSearchProvider} from '../../providers/StarSearch.Provider';
import StarSearch from './StarSearch';

const Provider = ({navigation}) => {
  return (
    <StarSearchProvider>
      <StarSearch navigation={navigation} />
    </StarSearchProvider>
  );
};

export default Provider;
