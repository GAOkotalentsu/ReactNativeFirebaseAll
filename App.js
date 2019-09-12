import React, { Component } from 'react';
import { Platform } from 'react-native';
//import Login from './src/Components/Authentication/Login';
import NetworkMonitor from './src/NetworkMonitor'
import { Provider } from 'react-redux';
import userStore from './userStore'
import utilStore from './utilStore'


import Routes from "./src/Routes";


export default class App extends Component {

  constructor(props) {
    super(props);
    this.networkMonitor = new NetworkMonitor(utilStore);
    this.networkMonitor.start();
 }
 
 componentWillUnmount() {
  this.networkMonitor.stop();
 }

  render() {
    return (
      <Provider store={userStore}>
        <Provider store={utilStore}>
        <Routes />
        </Provider>
      </Provider>
    );
  }
}

/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/
