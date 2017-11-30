import React, { Component } from 'react';

import {
  Text,
  View,
  Slider
} from 'react-native';

export default class LabeledSlider extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.setState({ currentValue: this.props.initialValue.toFixed(this.props.decimals) });
  }
  
  valueIndicatorBackground() {
    if (this.props.disabled) {
      return 'cornflowerblue';
    } else {
      return 'blue';
    }
  }
  
  render() {
    return (
      <View 
        style={{ flexDirection: 'column',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginTop: 5,
          marginRight: 10,
          marginLeft: 10,
          marginBottom: 5 
        }}>
        <View
          style={{ flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15
          }}>
          <Text>
            { this.props.label }
          </Text>
          <Text
            style={{ color: 'white',
              backgroundColor: this.valueIndicatorBackground(),
              borderRadius: 5,
              padding: 5 
            }}>
            { this.state.currentValue }
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row' }}>
          <Text>
            { this.props.minValue }
          </Text>
          <Slider
            style={{ flex: 1 }}
            maximumTrackTintColor='blue'
            minimumTrackTintColor='blue'
            thumbTintColor='blue'
            step={ this.props.step }
            disabled={ this.props.disabled }
            value={ this.props.initialValue }
            maximumValue={ this.props.maxValue }
            minimumValue={ this.props.minValue }
            onSlidingComplete={ this.props.listener }
            onValueChange={ (value) => {
              this.setState({ currentValue: value.toFixed(this.props.decimals) })
            }}/>
          <Text>
            { this.props.maxValue }
          </Text>
        </View>
      </View>
    );
  }
}
