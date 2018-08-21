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
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginTop: 5,
          marginRight: 10,
          marginLeft: 10,
          marginBottom: 5}}>
        <Text>
          { this.props.label }
        </Text>
        <Switch
          disabled= { this.props.disabled }
          thumbTintColor='blue'
          onTintColor='cornflowerblue'
          value={ this.props.value }
          onValueChange={ this.props.listener }/>
      </View>
    );
  }
}

export class LabeledSwitchWithFunctionValue extends Component {
  render() {
    return (
      <View 
      style={{flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5}}>
      <Text>
        { this.props.label }
      </Text>
      <Switch
        disabled= { this.props.disabled }
        thumbTintColor='blue'
        onTintColor='cornflowerblue'
        value={ this.props.value() }
        onValueChange={ this.props.listener }/>
    </View>
    )
  }
}
