import React, { Component } from 'react';

import { 
  TabNavigator
} from 'react-navigation';

import {
  ScanditModule
} from 'react-native-scandit';

import ScanTab from './tabs/ScanTab';
import SettingsTab from './tabs/SettingsTab';
import PickersTab from './tabs/PickersTab';

ScanditModule.setAppKey('-- ENTER YOUR SCANDIT LICENSE KEY HERE --');

export const ExtendedSample = TabNavigator({
  Scan: {
    screen: ScanTab
  },
  Settings: {
    screen: SettingsTab
  },
  Pickers: {
    screen: PickersTab
  }}, 
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    backBehavior: 'none',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: 'white'
      }
    },
  }
);
