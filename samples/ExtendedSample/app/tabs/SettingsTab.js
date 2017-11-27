import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Switch
} from 'react-native';

import {
  Barcode,
  SymbologySettings,
  ScanSettings
} from 'react-native-scandit';

import { 
  TabNavigator
} from 'react-navigation';

import Events from 'react-native-simple-events';
import LabeledSwitch from '../components/LabeledSwitch'

export default class SettingsTab extends Component {
  
  constructor() {
    super();
  }
  
  static navigationOptions = {
    title: 'Settings',
    tabBarOnPress: (scene, jumpToIndex) => {
      jumpToIndex(scene.index);
    }
  };
  
  componentDidMount() {
    console.log('SettingsTab mounted');
  }
  
  componentWillMount() {
    this.fetchSettings();
  }
  
  async fetchSettings() {
    try {
      var storedSettings = await AsyncStorage.getItem('@MySuperStore:settings');
      super.setState(JSON.parse(storedSettings));
    } catch (error) {
      console.error(error);
    }
  }
  
  async saveSettings() {
    try {
      await AsyncStorage.mergeItem('@MySuperStore:settings', JSON.stringify(this.state));
    } catch (error) {
      console.error(error);
    }
  }
  
  setState(state) {
    super.setState(state);
    this.saveSettings();
  }
  
  render() {
    if (!this.state) {
      return (
        <ActivityIndicator
          style={{flex:1}}
          size='large'/>
      );
    }
    return (
        <ScrollView style={{flex:1}}>
          <Text style={{fontWeight: 'bold',
            margin: 10}}>
            Symbologies
          </Text>
          <LabeledSwitch
            label='EAN-13 & UPC-A'
            value={this.state.symbologies[Barcode.Symbology.EAN13].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.EAN13].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='EAN-8'
            value={this.state.symbologies[Barcode.Symbology.EAN8].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.EAN8].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='UPC-E'
            value={this.state.symbologies[Barcode.Symbology.UPCE].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.UPCE].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='2-Digit Add-On'
            value={this.state.symbologies[Barcode.Symbology.TWO_DIGIT_ADD_ON].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.TWO_DIGIT_ADD_ON].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='5-Digit Add-On'
            value={this.state.symbologies[Barcode.Symbology.FIVE_DIGIT_ADD_ON].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.FIVE_DIGIT_ADD_ON].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Code 11'
            value={this.state.symbologies[Barcode.Symbology.CODE11].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODE11].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Code 25'
            value={this.state.symbologies[Barcode.Symbology.CODE25].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODE25].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Code 39'
            value={this.state.symbologies[Barcode.Symbology.CODE39].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODE39].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Code 93'
            value={this.state.symbologies[Barcode.Symbology.CODE93].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODE93].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Code 128'
            value={this.state.symbologies[Barcode.Symbology.CODE128].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODE128].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Interleaved-Two-Five (ITF)'
            value={this.state.symbologies[Barcode.Symbology.ITF].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.ITF].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='MSI Plessey'
            value={this.state.symbologies[Barcode.Symbology.MSI_PLESSEY].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.MSI_PLESSEY].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='GS1 DataBar'
            value={this.state.symbologies[Barcode.Symbology.GS1_DATABAR].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.GS1_DATABAR].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='GS1 DataBar Limited'
            value={this.state.symbologies[Barcode.Symbology.GS1_DATABAR_LIMITED].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.GS1_DATABAR_LIMITED].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='GS1 DataBar Expanded'
            value={this.state.symbologies[Barcode.Symbology.GS1_DATABAR_EXPANDED].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.GS1_DATABAR_EXPANDED].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Codabar'
            value={this.state.symbologies[Barcode.Symbology.CODABAR].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.CODABAR].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='QR'
            value={this.state.symbologies[Barcode.Symbology.QR].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.QR].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Data Matrix'
            value={this.state.symbologies[Barcode.Symbology.DATA_MATRIX].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.DATA_MATRIX].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='PDF417'
            value={this.state.symbologies[Barcode.Symbology.PDF417].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.PDF417].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='MicroPDF417'
            value={this.state.symbologies[Barcode.Symbology.MICRO_PDF417].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.MICRO_PDF417].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='Aztec'
            value={this.state.symbologies[Barcode.Symbology.AZTEC].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.AZTEC].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='MaxiCode'
            value={this.state.symbologies[Barcode.Symbology.MAXICODE].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.MAXICODE].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='RM4SCC'
            value={this.state.symbologies[Barcode.Symbology.RM4SCC].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.RM4SCC].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='KIX'
            value={this.state.symbologies[Barcode.Symbology.KIX].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.KIX].enabled = value;
              this.setState(this.state);
            }}
          />
          <LabeledSwitch
            label='DotCode'
            value={this.state.symbologies[Barcode.Symbology.DOTCODE].enabled}
            listener={(value) => {
              this.state.symbologies[Barcode.Symbology.DOTCODE].enabled = value;
              this.setState(this.state);
            }}
          />
        </ScrollView>
    );
  }
}
