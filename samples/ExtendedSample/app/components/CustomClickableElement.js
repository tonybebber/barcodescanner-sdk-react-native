import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class CustomClickableElement extends Component {

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="white">
        <View
          style={{flexDirection: 'row',
            borderBottomWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            borderBottomColor: 'black',
            justifyContent: 'space-between'}}>
          <View style={{marginBottom: 10,
            marginTop: 10,
            alignItems: 'center'}}>
            <Text style={{
              fontSize: 20
            }}>
              { this.props.mainLabel }
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
