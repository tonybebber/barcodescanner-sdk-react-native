import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

export default class PickersTab extends Component {
  
  static navigationOptions = {
    title: 'Pickers',
    tabBarOnPress: (scene, jumpToIndex) => {
      jumpToIndex(scene.index);
    }
  };
  
  componentDidMount() {
    console.log('PickersTab mounted');
  }
  
  componentWillMount() {
    console.log('PickersTab will mount');
  }
  
  render() {
    return (
      <View>
        <Text>Pickers here</Text>
      </View>
    );
  }
}
