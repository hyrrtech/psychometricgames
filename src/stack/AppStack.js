import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack';
import BART from '../screens/BART/BART';
import Transition from '../screens/Transition';
import Home from '../screens/Home';
const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={Home} options={screenOptions} />
      <Stack.Screen name="BART" component={BART} options={screenOptions} />
      <Stack.Screen
        name="Transition"
        component={Transition}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
