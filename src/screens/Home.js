import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
import {AuthContext} from '../providers/AuthProvider';
import Select from '../components/Select';
import CircularProgress from '../components/CircularProgress';

import {COLORS, FontStyle} from '../values/';
const Home = ({navigation}) => {
  const {user, signout} = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Button onPress={signout} title="signout" />
      <Select
        options={['Hindi', 'English', 'French', 'Tamil', 'Others']}
        selection="multiple"
        selectionStyle="text"
        backgroundColor={COLORS.secondary_200}
        textColor={COLORS.neutral_600}
        activeColor={COLORS.secondary_300}
        onChange={selected => console.log(selected)}
      />
      <CircularProgress percentage={10} max={100} radius={35} />
    </View>
  );
};

export default Home;
