import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  findNodeHandle,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  SymbologySettings,
  ScanSettings
} from 'react-native-scandit';

import { 
  TabNavigator
} from 'react-navigation';

import Events from 'react-native-simple-events';

export default class ScanScreen extends Component {
  
  constructor(props) {
    super(props);
  }
  
  static navigationOptions = {
    title: 'Scan',
    tabBarOnPress: (scene, jumpToIndex) => {
      Events.trigger('fetch', null);
      jumpToIndex(scene.index);
    }
  }
  
  async fetchSettings() {
    try {
      var storedSettings = await AsyncStorage.getItem('@MySuperStore:settings');
      this.settings = JSON.parse(storedSettings);
    } catch (error) {
      console.error(error);
    }
    if (this.settings == null) {
      this.initAndStoreSettings();
    }
    if (this.scanner != null) {
      this.scanner.applySettings(this.settings);
    }
  }
  
  async initAndStoreSettings() {
    this.settings = new ScanSettings();
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.TWO_DIGIT_ADD_ON, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.FIVE_DIGIT_ADD_ON, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE11, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE25, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE39, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE93, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE128, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.ITF, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.MSI_PLESSEY, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.GS1_DATABAR, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.GS1_DATABAR_LIMITED, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.GS1_DATABAR_EXPANDED, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODABAR, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.QR, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.DATA_MATRIX, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.PDF417, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.MICRO_PDF417, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.AZTEC, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.MAXICODE, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.RM4SCC, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.KIX, false);
    this.settings.setSymbologyEnabled(Barcode.Symbology.DOTCODE, false);
    try {
      console.log(this.settings);
      await AsyncStorage.setItem('@MySuperStore:settings', JSON.stringify(this.settings));
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.scanner.startScanning();
  }
  
  componentWillMount() {
    Events.on('fetch', 'scanTab', () => { this.fetchSettings() });
    this.fetchSettings();
  }
  
  componentWillUnmount() {
    Events.rm('fetch', 'scanTab');
  }

  render() {
    return (
      <View 
        style={{flex: 1}}>
        <BarcodePicker
          onScan={(session) => { this.onScan(session) }}
          scanSettings= { this.settings }
          ref={(scan) => { this.scanner = scan }}
          style={{flex: 1}}/>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>
          Scan a Code
        </Text>
      </View>
    );
  }

  onScan(session) {
    alert(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
  }

}
