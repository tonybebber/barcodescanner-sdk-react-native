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

ScanditModule.setAppKey('AVjqqgDsG+hwDeDnkkCaua8/Tzm5Q2nG2278gQxT75TpDqNvIHyi4m1c/Dz5UOy3LTrGi8pxMFsmZpqi2lxA3qxycfw1RDJCGWsm42Nj9gxLf/GpnW/wdSFdsefyalOkhQHQRfg23GlQ57qcTQQjT8lHK6jtPkJjPVZoV2yZCpqpmKjQ0UnCkysV4dlHDaY4hnLUb+Iyoislz4Tuxt4/FgIEyLeeQkbIxzlRBERikFh7U4WfBSmiS3rSBseXhs6+dLxcdjJXcMIaOAZV0mXHwart25i/zCAEMZJzawfSEdqy+ggyAluHv7ZmFpyFBtwhERNp2UC0fOSH5fvIi9znWutsFkIiXD+kFLQ2IpGI+xt6SE2cS4GrHO/oeFn7hmRe0QsLkLPs7muE4tJWasU3Ph6Ljz6KbqhVsSa1+v+RFd4HgmhewrRTsq5m7x1mGRgpwjxQSG/Oj+A9W/nMlNR6qyxzEvZiHSSLDxSGd9gT7ELzGJGFUzvTrIDkyYbCSUN7Ase6GdqFiIWV+ueK02p+5g8T1xyrTHM3a5b7dBItKcnBgynu9FsOBsVoegJswOtJGVUz9hGHOp8qM0OXLpIVTS3FZzhlHeyCa0WxnL5Roir832mo6c9pfvyNY/OabCORBP2/DAbOBfabN5VmyfZXCtRCMmPubC6Nx+s57qw7B+Qrw41gPl7asMaDQE+fNJTehQBxD1Hhoe89YhH7q92ul/VijQeiQM3deC1nU0AwJZoh2XhQRbGfba4tkBlshkxg5jUxGmdiRcLhy4rJ0JUGdly3n6JNihIMRle2FFzoigZ1ZaCTCcU=');

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
      activeTintColor: '#e91e63'
    }
  }
);
