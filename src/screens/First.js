import React from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, UIManager, TextInput, TouchableOpacity } from 'react-native';

import Dimensions from 'Dimensions';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class First extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'First',
  });

  onPress() {
    this.props.navigation.navigate('Quiz');
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.touchable} onPress={() => this.onPress()}>
            <View style={styles.btnview}>
            <Text style={styles.text}>{'Start Quiz'}</Text>
            </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  btnview: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
 
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: SCREEN_WIDTH - 100,
    borderRadius: 20,
    backgroundColor: '#FF2D55',
    marginBottom: 20
  },
  
  text: {
    color: '#000000'
  },

});