import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack';
import Home from '../screens/Home';
import BART from '../screens/BART/BART';
import SHARK from '../screens/SHARK/SHARK';
import MemoryMatrix from '../screens/Memory Matrix/MemoryMatrix';
import Transition from '../screens/Transition';
import KillTheSpider from '../screens/Kill The Spider/KillTheSpider';
import Test from '../screens/Test';

const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={Home} options={screenOptions} />
      <Stack.Screen name="BART" component={BART} options={screenOptions} />
      <Stack.Screen name="SHARK" component={SHARK} options={screenOptions} />
      <Stack.Screen
        name="MemoryMatrix"
        component={MemoryMatrix}
        options={screenOptions}
      />
      <Stack.Screen
        name="KillTheSpider"
        component={KillTheSpider}
        options={screenOptions}
      />
      <Stack.Screen name="Test" component={Test} options={screenOptions} />
      <Stack.Screen
        name="Transition"
        component={Transition}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
