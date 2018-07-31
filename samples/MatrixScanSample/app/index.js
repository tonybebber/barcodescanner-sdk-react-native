import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  findNodeHandle,
  View
} from 'react-native';
import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  SymbologySettings,
  ScanSettings,
  ScanOverlay
} from 'scandit-react-native';

ScanditModule.setAppKey('-- ENTER YOUR SCANDIT LICENSE KEY HERE --');

export default class MatrixScanSample extends Component {

  componentWillMount() {
    this.settings = new ScanSettings();
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    
    this.settings.matrixScanEnabled = true;
    this.settings.codeRejectionEnabled = true;
    this.settings.highDensityModeEnabled = true;
    this.settings.maxNumberOfCodesPerFrame = 10;
  }

  componentDidMount() {
    this.scanner.setGuiStyle(ScanOverlay.GuiStyle.MATRIX_SCAN);
    this.scanner.startScanning();
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.scanner.stopScanning();
    } else {
      this.scanner.startScanning();
    }
  }

  render() {
    return (
      <View style={{
			flex: 1,
			flexDirection: 'column'}}>
			<BarcodePicker
				onRecognizeNewCodes={(session) => { this.onRecognizeNewCodes(session) }}
				scanSettings= { this.settings }
        ref={(scan) => { this.scanner = scan }}
				style={{ flex: 1 }}/>
    </View>
    );
  }

  onRecognizeNewCodes(session) {
    // If you want to visualy reject a code you should use ScanSession's rejectCode.
    // For example, the following code will reject all EAN8 codes.
    session.newlyTrackedCodes.forEach(function(barcode) {
      if (barcode.symbology == Barcode.Symbology.EAN8) {
        session.rejectTrackedCode(barcode);
      }
    });
  }

}
