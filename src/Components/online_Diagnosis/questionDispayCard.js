import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Content, Header, Button, Text, Col, Grid, Container, Card, CardItem, Body } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';


export default class QuestionDispayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      que: !!this.props.que ? this.props.que === null ? "this is demo que" : this.props.que : "this is demo que",
      op: !!this.props.op ? this.props.op === null ? ["a", "b", "c", "d"] : this.props.op : ["a", "aa", "b", "bb"],
      selectedOption: this.props.selectedOption ? this.props.selectedOption : null,
    };
  }

  componentWillReceiveProps() {
    if (!this.state.selectedOption && !!this.props.selectedOption) {
      console.log("inside card display" + this.props.selectedOption)
      this.setState({ selectedOption: this.props.selectedOption })
    }
    console.log("out of  card display" + this.props.selectedOption)
  }

  handelSelection(key) {//key starting from 1
    if (!this.state.selectedOption) {
      this.props.sendSelection(false, key, this.props.id)
    }
    else {
      this.props.sendSelection(true, key, this.props.id)
    }
    console.log(key)
    this.setState({ selectedOption: key })
  }


  // handelSelection(key) {
  //   let tempSelectedOption = String.fromCharCode(key + 65)
  //   if (!this.state.selectedOption) {
  //     this.props.callBackFromNcdScreen(false, this.props.score[key], this.props.id)
  //   }
  //   else {
  //     this.props.callBackFromNcdScreen(this.state.selectedScore, this.props.score[key], this.props.id)
  //   }

  //   this.setState({ selectedOption: tempSelectedOption, selectedScore: this.props.score[key] })
  // }


  render() {
    return (
      <Content style={{ backgroundColor: "#d6d6d6" }}>
        <View style={{ marginHorizontal: 6, marginVertical: 1, borderRadius: 5 }}>
          <Card>
            <CardItem style={{ backgroundColor: (!!this.props.alert ? '#ed363a' : null) }}>
              <Text>{this.state.que}</Text>
            </CardItem>
            {
              this.props.op.map((op, key) => {
                return (
                  <CardItem key={key.toString()}>
                    {
                      ((!!this.state.selectedOption ? this.state.selectedOption : 50 /*50 is a random no.*/) == key + 1) ?
                        //selected
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name="md-radio-button-on" size={20} color="#000" />
                          <Text>  {op}</Text>
                        </View>
                        :
                        //Not Selected
                        <TouchableOpacity onPress={() => this.handelSelection(key + 1)}>
                          <View style={{ flexDirection: 'row' }}>
                            <Icon name="md-radio-button-off" size={20} color="#000" />
                            <Text>  {op}</Text>
                          </View>
                        </TouchableOpacity>
                    }
                  </CardItem>
                )
              })
            }
          </Card>
        </View>
      </Content>
    );
  }
}

