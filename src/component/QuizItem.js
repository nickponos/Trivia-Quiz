import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import Dimensions from 'Dimensions'
import {updateVal} from '../actions/answer'
import { connect } from 'react-redux';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class QuizItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quiz: this.props.initData.question,
      type: this.props.initData.type,
      data: this.props.initData.answers,
      category: this.props.initData.category,
      difficulty: this.props.initData.difficulty,
      index: this.props.idx
    };

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }
  
  onPress = data => this.setState({data});

  updateSelectedVal(value) {
    const param = {
      "index": this.state.index,
      "value" : value,
    };
    this.props.updateVal(param);
  }

  render() {
    const difficulty = this.state.difficulty;
    let wrapView;

    let selectedButton = this.state.data.find(e => e.selected == true);
    let selectedVal = selectedButton ? selectedButton.value : this.state.data[0].label;
    this.updateSelectedVal(selectedVal);

    if (difficulty == "easy") {
      wrapView =  <View style={styles.easyView}>
                    <View style={styles.quizArea}>
                      <Text style={styles.quizText}>{this.state.quiz}</Text>
                    </View>
                    <View style={styles.answerArea}>
                      <RadioGroup radioButtons={this.state.data} onPress={this.onPress}/>
                    </View>
                  </View>;
    } else if (difficulty == "medium") {
      wrapView =  <View style={styles.mediumView}>
                    <View style={styles.quizArea}>
                      <Text style={styles.quizText}>{this.state.quiz}</Text>
                    </View>
                    <View style={styles.answerArea}>
                      <RadioGroup radioButtons={this.state.data} onPress={this.onPress}/>
                    </View>
                  </View>;
    } else {
      wrapView =  <View style={styles.hardView}>
                    <View style={styles.quizArea}>
                      <Text style={styles.quizText}>{this.state.quiz}</Text>
                    </View>
                    <View style={styles.answerArea}>
                      <RadioGroup radioButtons={this.state.data} onPress={this.onPress}/>
                    </View>
                  </View>;
    }

    
    return (
      <View style={styles.container}>
        {wrapView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#191970',
  },
  easyView: {
    backgroundColor: '#AFEEEE',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediumView: {
    backgroundColor: '#F4A460',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hardView: {
    backgroundColor: '#FF1493',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quizText: {
    fontSize: 18
  }
})

const mapStateToProps = state => {
  return {
    radio_vals: state.selected_values.radio_vals
  }
}

const mapDispatchToProps = {
  updateVal
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizItem)
