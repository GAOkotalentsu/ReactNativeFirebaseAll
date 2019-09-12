import React, { Component } from 'react';
import {
  View,
  Dimensions,
  WebView,
  Platform,
} from 'react-native';

const injectedScript = function() {
  function waitForBridge() {
      //Delaying for URL fetching
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      postMessage(
        Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
      )
    }
  }
  waitForBridge();
};

export default class WebViewComponent extends Component {
  state = {
    webViewHeight: Number
  };

  constructor (props) {
    super(props);
    this.state = {
      webViewHeight: 0
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    });
  }
// Stops the loading of the webview used in onNavigationStateChange method
  stopLoading() {
    this.webview.stopLoading();
  }

  // Reloads the webview used in onNavigationStateChange method

  reload() {
    this.webview.reload();
  }
  /*
    handleChange = () =>{
        //Funtion Statements
        this.relod() // this.stopLoading()
    }

    <WebView onNavigationStateChange={this.handleNavigationChange} />

  */

  render () {
    const _h = this.state.webViewHeight;
    const androidScript = 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');' +
    '(' + String(injectedScript) + ')();';
    const iosScript = '(' + String(injectedScript) + ')();' + 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');';
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        injectedJavaScript={Platform.OS === 'ios' ? iosScript : androidScript}
        scrollEnabled={false}
        onMessage={this._onMessage}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{height: _h}]}
      />
    )
  }
}