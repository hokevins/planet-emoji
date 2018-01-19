import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Game from './components/Game';

const RootNavigator = StackNavigator({
    Main: {
        screen: Home,
        navigationOptions: {
          headerTitle: 'Home',
        }
    },
    Game: {
      screen: Game,
      navigationOptions: {
        headerTitle: 'Planet Emoji'
      }
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}
