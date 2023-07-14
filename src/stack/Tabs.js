import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../values/Colors';
const {primary, neutral_400} = COLORS;

import Home from '../screens/Home';
import HomeSvg from '../assets/nav_icons/home.svg';
import JobsSvg from '../assets/nav_icons/jobs.svg';
import InboxSvg from '../assets/nav_icons/inbox.svg';
import ProfileSvg from '../assets/nav_icons/profile.svg';
import GamesSvg from '../assets/nav_icons/games.svg';

const Tab = createBottomTabNavigator();

const Icon = ({iconName, focused}) => {
  const color = focused ? primary : neutral_400;

  const iconComponents = {
    home: <HomeSvg width={30} height={30} fill={color} />,
    inbox: <InboxSvg width={30} height={30} fill={color} />,
    profile: <ProfileSvg width={30} height={30} fill={color} />,
    games: <GamesSvg width={30} height={30} fill={color} />,
    jobs: <JobsSvg width={30} height={30} fill={color} />,
  };

  return iconComponents[iconName];
};

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: neutral_400,
        tabBarStyle: {
          backgroundColor: '#fafafc',
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Poppins',
          fontWeight: '400',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <Icon iconName="home" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
