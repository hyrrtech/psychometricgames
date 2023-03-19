import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import GetStarted from '../screens/GetStarted';
import AnimatedBalloon from '../screens/AnimationBalloon';
const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      // }}
      >
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={screenOptions}
        />
        <Stack.Screen
          name="Balloon"
          component={AnimatedBalloon}
          options={screenOptions}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={screenOptions}
        />
        <Stack.Screen name="Login" component={Login} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
