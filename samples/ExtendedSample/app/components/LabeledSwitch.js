import React, { Component } from 'react';

import {
  Text,
  View,
  Switch
} from 'react-native';

export default class LabeledSwitch extends Component {
  
  render() {
    return (
      <View 
        style={{flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5}}>
        <Text>{this.props.label}</Text>
        <Switch
          value={this.props.value}
          onValueChange={this.props.listener}/>
      </View>
    );
  }
}
