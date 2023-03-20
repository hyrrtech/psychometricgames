import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack';
import BalloonGame from '../screens/BalloonGame';
import TestScreen from '../screens/TestScreen';
const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function MainStack() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    // }}
    >
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Balloon"
        component={BalloonGame}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
