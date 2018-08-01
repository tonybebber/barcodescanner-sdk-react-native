/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  AppState,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  Rect,
  SymbologySettings,
  ScanSettings,
  ScanOverlay
} from 'scandit-react-native';

export default class SplitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: new Array(),
      tapVisible: false
    };
  }

  componentWillMount() {
    this.settings = new ScanSettings();
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE128, true);
    this.settings.activeScanningAreaPortrait = new Rect(0, 0.48, 1, 0.04);
    this.settings.activeScanningAreaLandscape = new Rect(0, 0.48, 1, 0.04);
    this.settings.codeDuplicateFilter = 1000;
  }

  componentDidMount() {
    this.mounted = true;
    this.scanner.setGuiStyle(ScanOverlay.GuiStyle.LASER);
    this.startScanning();
  }
  
  componentWillUnmount() {
    this.mounted = false;
  }

  onScan(session) {
    this.state.codes.push({
      code: session.newlyRecognizedCodes[0].data
    });
    this.setState(this.state);
    this.setTimer();
  }

  onClearPress() {
    this.setState({codes: new Array()});
  }

  tapPress() {
    this.startScanning();
    this.setState({
      tapVisible: false
    });
  }

  setTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.stopScanning();
      if (this.mounted) {
        this.setState({
          tapVisible: true
        });
      }
    }, 5000);
  }
  
  stopScanning() {
    if (this.scanner) {
      this.scanner.stopScanning();
    }
  }
  
  startScanning() {
    if (this.scanner) {
      this.setTimer();
      this.scanner.startScanning();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', backgroundColor: 'white' }}>
        <View style={{ flex: 20 }}>
          <BarcodePicker
            onScan={(session) => { this.onScan(session) }}
            scanSettings= { this.settings }
            ref={(scan) => { this.scanner = scan }}
            style={{ width: '100%', height: '100%' }}/>
          {this.state.tapVisible && (
            <View style={styles.overlay}>
              <TouchableWithoutFeedback
                style={{ width: '100%', height: '100%' }}
                onPress={() => {this.tapPress()}}>
                <View style={{ width: '100%', height: '100%'}}>
                  <Text style={styles.tapText}>
                    Tap to Resume
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <View style={{ flex: 70 }}>
          <FlatList style={{ flex: 1 }}
            data={ this.state.codes }
            renderItem={({item}) => <Text style={styles.item}>{item.code}</Text>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
        <View style={{ flex: 10, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
          <Button
            onPress={() => this.onClearPress()}
            title="CLEAR"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tapText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000000E0'
  }
})
