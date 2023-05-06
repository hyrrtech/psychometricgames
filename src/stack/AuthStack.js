import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import OnBoarding from '../screens/OnBoarding';
const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={screenOptions}
      />
      <Stack.Screen name="Login" component={Login} options={screenOptions} />
      <Stack.Screen name="Signup" component={Signup} options={screenOptions} />
    </Stack.Navigator>
  );
}

export default AuthStack;
