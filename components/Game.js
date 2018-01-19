import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
// import { StackNavigator } from 'react-navigation';

import { emojis } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(185, 185, 185, .5)',
    alignItems: 'center'
  },
  gamePlay: {
      borderWidth: 2,
      alignItems: 'center',
      margin: 5,
      backgroundColor: 'rgba(100, 100, 100, .6)'
  },
  gameManager: {
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      marginTop: 100,
      backgroundColor: 'rgba(30, 30, 30, .6)'
  },
  backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
  },
  mainText: {
      height: 40,
      width: 250,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 5,
      textAlign: 'center',
      color: '#FFFFFF',
      backgroundColor: 'rgba(30, 30, 30, .6)'
  }
});

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      emojis: [],
      randomQuestion: 0,
      score: 0,
      guess: '',
      gameMessage: 'Feel the Emoji, Translate the Emoji',
      isActive: true
    };
    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkGuess = this.checkGuess.bind(this);
  }

  componentDidMount(){
    this.restartGame();
  }

  restartGame () {
    let emojisArr = emojis.slice();
    let randomQuestion = this.pickRandomQuestion(emojisArr);
    this.setState({
      emojis: emojisArr,
      randomQuestion,
      score: 0,
      guess: '',
      gameMessage: 'Feel the Emoji, Translate the Emoji',
      isActive: true
    });
  }

  pickRandomQuestion (arr){
    return Math.floor(Math.random() * arr.length);
  }

  handleChange (guess) {
    this.setState({
      guess
    });
  }

  checkGuess () {
    let { guess, score, gameMessage, emojis, randomQuestion, isActive } = Object.assign({}, this.state);
    if (!this.state.guess){
      let randomEncouragement = ['Don\'t be afraid to guess!', 'Spread your wings and fly', 'You must type an answer!'];
      gameMessage = randomEncouragement[Math.floor(Math.random() * randomEncouragement.length)];
    } else {
      let transformedGuess = guess.replace(/\W/g, '').toLowerCase();
      let transformedAnswer = emojis[randomQuestion].answer.replace(/\W/g, '').toLowerCase();
      if (transformedGuess === transformedAnswer){
        score += 10;
        gameMessage = 'Nice Job!';
        emojis = emojis.filter((emoji, index) => index !== randomQuestion);
        randomQuestion = this.pickRandomQuestion(emojis);
      } else {
        gameMessage = 'Try Again!';
      }
    }
    if (!emojis.length){
      gameMessage = 'You Win!';
      isActive = false;
    }
    this.setState({
      guess: '',
      score,
      gameMessage,
      randomQuestion,
      emojis: emojis,
      isActive
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../assets/globe.png')}></Image>
        {/*
          this.state.emojis.map((emoji, index) => (<Text key={index}>{emoji.question}</Text>))
        */}
        <Text style={{color: '#FFF', fontSize: 30, margin: 20, marginTop: 60}}>{this.state.gameMessage}</Text>
        <Text style={{color: '#000', fontSize: 20, margin: 15, marginTop: 50}}>>SCORE:
          <Text style={{color: '#33FF55', fontWeight: 'bold'}}>
            {` ${this.state.score}`}
          </Text>
        </Text>
        {
          this.state.isActive && (
            <View style={styles.gamePlay}>
              <Text style={{color: '#FFF', fontSize: 25, marginBottom: 10}}>
                {this.state.emojis.length && this.state.emojis[this.state.randomQuestion].question}
              </Text>
              <TextInput
                style={styles.mainText}
                placeholderTextColor= "#FFFFFF"
                onChangeText={(guess) => this.handleChange(guess)}
                value={this.state.guess}
                placeholder="Guess the Phrase!"
              />
              <Button
                color= "#FFFFFF"
                onPress={this.checkGuess}
                title="Make Guess!"
                disabled={!this.state.isActive}
              />
            </View>
          )
        }
        <View style={styles.gameManager}>
          <Button color="#FFFFFF" style={{marginTop: 100}} onPress={this.restartGame} title="Restart Game">Restart Game</Button>
          {/* <Button color="#FFFFFF" style={{marginTop: 100}} onPress={() => Actions.pop() } title="Quit Game">Quit Game</Button> */}
        </View>
      </View>
    );
  }
}
