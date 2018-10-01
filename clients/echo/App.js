/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import fetch from 'cross-fetch';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.onPressSend = this.onPressSend.bind(this);
    this.url = '';
    this.msg = '';
  }

  onPressSend() {
    if (this.url && this.msg) {
      let url = (this.url + ':3031/inbound/123456').toLowerCase();
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          message: this.msg
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(function (response) {
        let text = response.text();
        return response.status;
      }, function (error) {
        console.log(error.message);
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Echo service</Text>
        <View style={styles.inputRow}>
          <Text style={styles.instructions}>Server url: </Text>
          <TextInput style={styles.inputs}
            placeholder="Enter server url here"
            onChangeText={text => this.url = text}
          />
          <Text style={styles.instructions}>:3031</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.instructions}>Message: </Text>
          <TextInput style={styles.inputs}
            placeholder="Enter message here"
            onChangeText={text => this.msg = text}
          />
          <Text style={styles.instructions} />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={this.onPressSend}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center'
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  instructions: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
  },
  inputs: {
    fontSize: 16,
    flex: 1,
  },
  sendButton: {
    marginTop: 40,
    backgroundColor: '#00aeef',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});
