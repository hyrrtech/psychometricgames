import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Tabs from './Tabs';

import Home from '../screens/Home';
import Games from '../screens/Games';
import Jobs from '../screens/Jobs';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import BART from '../screens/BART/BART';
import SHARK from '../screens/SHARK/SHARK';
import MemoryMatrix from '../screens/Memory Matrix/MemoryMatrix';
import Transition from '../screens/Transition';
import KillTheSpider from '../screens/Kill The Spider/KillTheSpider';
import TrainOfThoughts from '../screens/Train of Thoughts/';
import CarGame from '../screens/Car/';
import ColorMatch from '../screens/Color Match/ColorMatch';
import FishGame from '../screens/Fish Game/';
import PiratePassage from '../screens/Pirate Passage/';
import FuseWire from '../screens/Fuse Wire/';
import FrogJump from '../screens/Frog Jump/';
import OrganicOrder from '../screens/Organic Order/';
import Masterpiece from '../screens/Masterpiece/';
import StarSearch from '../screens/Star Search/';

const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Tabs" component={Tabs} options={screenOptions} />
      <Stack.Screen name="Home" component={Home} options={screenOptions} />
      <Stack.Screen name="Games" component={Games} options={screenOptions} />
      <Stack.Screen name="Jobs" component={Jobs} options={screenOptions} />
      <Stack.Screen name="Inbox" component={Inbox} options={screenOptions} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={screenOptions}
      />
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
      <Stack.Screen
        name="FuseWire"
        component={FuseWire}
        options={screenOptions}
      />
      <Stack.Screen
        name="FrogJump"
        component={FrogJump}
        options={screenOptions}
      />
      <Stack.Screen
        name="OrganicOrder"
        component={OrganicOrder}
        options={screenOptions}
      />
      <Stack.Screen
        name="Masterpiece"
        component={Masterpiece}
        options={screenOptions}
      />
      <Stack.Screen
        name="StarSearch"
        component={StarSearch}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
