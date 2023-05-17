import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import BART from '../screens/BART/BART';
import SHARK from '../screens/SHARK/SHARK';
import MemoryMatrix from '../screens/Memory Matrix/MemoryMatrix';
import Transition from '../screens/Transition';
import KillTheSpider from '../screens/Kill The Spider/KillTheSpider';
import TrainOfThoughts from '../screens/Train of Thoughts/';
import CarGame from '../screens/Car/';
import ColorMatch from '../screens/Color Match/ColorMatch';
import FishGame from '../screens/Fish Game/';
import PiratePassage from '../screens/Pirate Passage/PiratePassage';

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
        name="CarGame"
        component={CarGame}
        options={screenOptions}
      />
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
      <Stack.Screen
        name="TrainOfThoughts"
        component={TrainOfThoughts}
        options={screenOptions}
      />
      <Stack.Screen
        name="Transition"
        component={Transition}
        options={screenOptions}
      />
      <Stack.Screen
        name="ColorMatch"
        component={ColorMatch}
        options={screenOptions}
      />
      <Stack.Screen
        name="FishGame"
        component={FishGame}
        options={screenOptions}
      />
      <Stack.Screen
        name="PiratePassage"
        component={PiratePassage}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
