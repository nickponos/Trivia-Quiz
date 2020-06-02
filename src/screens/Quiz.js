import React from 'react';
import { Platform, StyleSheet, Text, View, UIManager, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group'
import Dimensions from 'Dimensions';
import QuizItem from '../component/QuizItem';
import Modal from 'react-native-modal';
import {updateVal} from '../actions/answer'
import {connect} from 'react-redux';
import {getQuizData} from '../services/api';
import Loging from '../component/Loading';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

let renderData = [];
let totalSeconds = 0;

class Quiz extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'First',
  });
  state 
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      finish: false,
      score: 0,
      elapsedTMin: 0,
      elapsedTSec: 0
    };
    
    setInterval(this.setTime, 1000);
    
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({loading:true});
    getQuizData().then((res)=>{
      if (res && res.response_code == 0) {
        res.results.forEach((element)=>{
          let item = {};
          item.category = element.category;
          item.type = element.type;
          item.difficulty = element.difficulty;
          item.question = element.question;
          item.answers = [];
          item.correct_answer = element.correct_answer;
          let answers = this.randomize(element.incorrect_answers.concat(element.correct_answer));
          answers.forEach((answer)=>{
            let answerItem = {};
            answerItem['label'] = answer;
            item.answers.push(answerItem);
          })
          
          renderData.push(item);
        });

        for (let i = 0; i < renderData.length ; i++) {
          let param = {
            "index": i,
            "value" : renderData[i].answers[0],
          };
          this.props.updateVal(param);
        }
      }
      this.setState({loading:false});
      totalSeconds = 0;
    });
  }

  playAgain = () => {
    //ToastAndroid.show("playagain", ToastAndroid.LONG);
    renderData = [];
    this.loadData();
  }

  finish =() => {
    //ToastAndroid.show("Finish", ToastAndroid.LONG);
    let sameNum = 0;
    for (let i = 0; i < renderData.length ; i++) {
      if (this.props.radio_vals[i].value == renderData[i].correct_answer)
        sameNum ++;
    }
    this.setState({score: sameNum});
    this.setState({ finish: true });
    
    
    let eMin = Math.floor(totalSeconds / 60);
    let eSec = totalSeconds % 60;
    this.setState({ elapsedTMin: eMin });
    this.setState({ elapsedTSec: eSec });
    
    console.log("end_time", Date.now());
  }

  setTime() {
    ++totalSeconds;
  }

  closeModal = () => {
    this.setState({ finish: false });
  };

  //Rondomize the answer list
  randomize(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  renderModalContent = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Your score is {this.state.score}! 👋</Text>
      <Text style={styles.contentTitle}>Your Time: {this.state.elapsedTMin} min {this.state.elapsedTSec} sec! 👋</Text>
      <TouchableOpacity
        onPress={() => this.setState({ finish: false })}
      >
        <Text style={styles.btnText}>{'Close'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
      {this.state.loading ? <Loging /> :
        <View>
          <Modal isVisible={this.state.finish} >
            {this.renderModalContent()}
          </Modal>
          <View style={styles.headerArea}>
              <Text style={styles.headerText}>{':)Give me your answer please:)'}</Text>
          </View>
          <View style={styles.quizarea}>
              <FlatList
                data = {renderData}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => 
                <QuizItem initData={item} idx={index}></QuizItem>
                }
                keyExtractor={(item, index) => index.toString()}
              />
          
          </View>
          
          <View style={styles.bottomArea} >
              <TouchableOpacity style={styles.againTouch} onPress={() => this.playAgain()}>
                  <Text style={styles.bottomText}>{'Play again'}</Text>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitTouch} onPress={() => this.finish()}>
                  <Text style={styles.bottomText}>{'Finish'}</Text>                
              </TouchableOpacity>
          </View>
        </View>
        }
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
  
  bottomArea: {
    height: 60,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  quizarea: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
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

  headerArea: {
    height: 40,
    width: SCREEN_WIDTH,
    backgroundColor: '#00FF00',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 18
  },

  againTouch: {
    flex: 1,
    backgroundColor: '#6A5ACD',
    height: 40,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  submitTouch: {
    flex: 1,
    backgroundColor: '#6495ED',
    height: 40,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bottomText: {
      fontSize: 18,
      color: 'white'
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 20,
  }

});

const mapStateToProps = state => {
  return {
    radio_vals: state.selected_values.radio_vals
  }
}

const mapDispatchToProps = {
  updateVal
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)