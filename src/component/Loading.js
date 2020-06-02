import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Dimensions from 'Dimensions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{'Loading'}</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#48333e73'
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})
