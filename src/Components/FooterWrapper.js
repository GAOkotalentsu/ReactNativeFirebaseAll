import React, { Component } from "react";
import { FooterTab, Button, Icon, Text, Footer } from "native-base";



export default class FooterWrapper extends Component {


  onPressHandler(tabNumber) {
    this.props.callBackFromFooter(tabNumber)
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={() => this.onPressHandler(1)} vertical active={this.props.activeFooterKey == 1 ? true : false}>
            <Icon name="filing" />
            <Text>Log</Text>
          </Button>
          <Button onPress={() => this.onPressHandler(2)} vertical active={this.props.activeFooterKey == 2 ? true : false}>
            <Icon name="document" />
            <Text>Document</Text>
          </Button>
          <Button onPress={() => this.onPressHandler(3)} vertical active={this.props.activeFooterKey == 3 ? true : false}>
            <Icon active name="body" />
            <Text>Fitness</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}