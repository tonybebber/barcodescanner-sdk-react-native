import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  findNodeHandle,
  View,
  Platform,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  SymbologySettings,
  ScanSettings
} from 'scandit-react-native';

ScanditModule.setAppKey('AUSrZQgfFegTMaMl3UPk11YKZtj3KdetWX+nLv5jFRMEdXd3SkM0xi5uMs5JTR8xJl/FR2Vs7yCObka2yCEWaUVv/sZkc9OKzBgjasdRwmH7XkE0Sn5D/CNpJnXEd35fp2yQoQxzPfeCaG9HWUXwLvVW8aAzfib6G1ETKlFD0vGyVtEiPUrebqt8iem+cFxa10MwWfZg6Tp7bGq3XXRoaz50a1L5dtXdE3gRfrhOL6irauTmkXRiYkRWcON6aQCjsU7zNDpUijiBbCnKy2LPBtdccFtfQy2QYnS+FL0o9zF/d8WMOXDdI2Rcqe4pQU/1c0i4Ce4GpzNgC6XazhQjH6mFunp59E2nbOhbhZaTUZQm00SodYoX9iryvcYqjnepqT8WEGORPZzb2bry8t0X0HPNvlrnjSMuxnCjLl9n4CseLqisJVNlgJsWoSD67UbvFjMkNKXrZDLFHBhUh8tG9LIkVu/5f1gBJqtvOUQ4cKNHjH7yrTAMkk+P0XwupLHXVp/yDnafCDv8Tn1jAlC/+OpQsjeF7zkI1j7jOrV09IxWCT+eiGOo/9eGFYtAEo7KsQSHTvUECaSwwKd/gOZt4bh7SfDmNuIP10d5myF1rFYVbcOTeRVrmmr0PhrO3s4LyBRp8QK3GzSCs/Jp6TLfQCIBz3nHbW/wcVBmCyGTA8zOPzYuJFAXV/drQQUwpQavKiA1h8g71foX20Dn2bqYnAJK4goXu2bdK/9637MoLjsRTAZvT3pVrG/1aM2kkKPVgFQtDVcaQLdsHJuTyXX2M0ni40sTkCQN0YfiFjgAasnozw/5uUuDCzJVcNFq6JGdfM/zSNiK+EQaP/w2kLlf1gw1bg7iHw5CtQHqvKa2mOP0g3zntApB88ClErDwiYO4VmhQM20BalxtTbKkUhPE7lVz+e2/9z8yOPLKpIiQgqWo7xIauOjbBY3iUjgRYndtfeSM3hWXBW/1KKc8+a9ptrZPSWV+QsMNngID6rspuxsD7ScM+OH8GSperqPXGA==');

export default class SimpleSample extends Component {

  componentWillMount() {
    console.log("WTF componentWillMount");
    this.settings = new ScanSettings();
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE39, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.ITF, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.QR, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.DATA_MATRIX, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE128, true);

    /* Some 1d barcode symbologies allow you to encode variable-length data. By default, the
       Scandit BarcodeScanner SDK only scans barcodes in a certain length range. If your
       application requires scanning of one of these symbologies, and the length is falling
       outside the default range, you may need to adjust the "active symbol counts" for this
       symbology. This is shown in the following few lines of code. */
    this.settings.getSymbologySettings(Barcode.Symbology.CODE39)
      .activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    /* For details on defaults and how to calculate the symbol counts for each symbology, take
       a look at http://docs.scandit.com/stable/c_api/symbologies.html. */
  }

  async hasCameraPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      return granted;
    } else {
      return true;
    }
  }

  async requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Android Camera Permission has been granted.");
          this.cameraPermissionGranted();
        } else {
          console.log("Android Camera Permission has been denied - the app will shut itself down.");
          this.cameraPermissionDenied();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.cameraPermissionGranted();
    }
  }

  // This method should only be called if the Platform.OS is android.
  cameraPermissionDenied() {
    BackHandler.exitApp();
  }

  cameraPermissionGranted() {
    this.scanner.startScanning();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  async componentDidMount() {
    const hasPermission = await this.hasCameraPermission();
    if (hasPermission) {
      this.cameraPermissionGranted();
    } else {
      await this.requestCameraPermission();
    }
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
          onScan={(session) => { this.onScan(session) }}
          scanSettings= { this.settings }
          ref={(scan) => { this.scanner = scan }}
          style={{ flex: 1 }}/>
      </View>
    );
  }

  onScan(session) {
    alert(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
  }

}
