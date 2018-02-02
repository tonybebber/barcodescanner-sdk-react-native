import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class StatusBar extends Component{
  render(){
    return(
      <View style={[styles.statusBar, this.props.style || {}]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "white",
    ...ifIphoneX({
      height: (Platform.OS === 'ios') ? 44 : 0
    }, {
      height: (Platform.OS === 'ios') ? 20 : 0
    })
  },
});
