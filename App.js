/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import Navigation from './src/navigation/Navigation'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import testReducer from './src/redux/reducer';



const store = createStore(testReducer);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "transparent" translucent={true} />
        <View style={styles.container}>
          <Navigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
