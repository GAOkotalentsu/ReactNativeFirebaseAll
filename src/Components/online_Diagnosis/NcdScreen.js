import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Content, Button, Text, Container, Input, Icon, Left, Body, Right } from "native-base";
import QuestionDispayCard from "./questionDispayCard";
import ncdQue from '../Diagnosis_Content/ncdQue';
import { sort_pair, indexOf_pair } from "../../Util/Array";


class NcdScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: this.props.response ? this.props.response : [],
      finalScore: null,
      incompleteForm: false,
      gender: this.props.gender ? this.props.gender : "male",
      name: null,
      newPropsRecived: true,
    }
  }
  questionCard = [];


  componentWillReceiveProps(nextProps) {
    if (!this.props.response !== !!nextProps.response)
      this.setState({ response: nextProps.response, newPropsRecived: true })
  }


  submit(goBack = false) {
    if ((2 * this.questionCard.length) === this.state.response.length) {
      this.setState({ incompleteForm: false })
      res = this.state.response
      this.props.submit("ncd", res, true, false, goBack)
    }
    else {
      this.setState({ incompleteForm: true });
      Alert.alert(
        'Alert',
        "Please give your response to all of the above questions.\nYou can also save the response to continue later.",
        [
          { text: 'Back' },
          {
            text: 'Continue later',
            onPress: () => this.props.submit("ncd", this.state.response, false, false, goBack),
          },
        ],
        { cancelable: false }
      )
    }
  }


  save() {
    res = this.state.response
    this.props.submit("ncd", res, false, true)
  }


  callBackFromQuestionDisplayCard(isUpdate, selectedOptionNumber, id) {
    //update selection
    if (isUpdate) {
      let arr = this.state.response;
      arr[indexOf_pair(arr, id) + 1] = selectedOptionNumber;
      this.setState({ response: arr });
    }
    //new selection
    else {
      let arr = this.state.response;
      arr.push(id);
      arr.push(selectedOptionNumber);
      arr = sort_pair(arr);
      this.setState({ response: arr });
    }
  }


  ncdQu() {
    //for first rendering
    if (!this.state.response.length || this.state.incompleteForm || this.state.newPropsRecived) {
      this.questionCard = [];
      let dataa = ncdQue();
      let j = 0;
      for (let i = 1; i <= dataa.numberOfQuestion; i++) {
        let tempSelectedOption
        if (this.state.response != 0) {
          if (this.state.response[2 * j] === i) {
            tempSelectedOption = this.state.response[2 * j + 1];
            j++;
          }
        }
        let tempOption = [];
        { dataa.Ques[i].gender ? (this.props.gender === "male" ? tempOption = dataa.Ques[i].option.m : tempOption = dataa.Ques[i].option.f) : tempOption = dataa.Ques[i].option }
        this.questionCard.push(
          <QuestionDispayCard
            key={i.toString()}
            id={i}
            que={dataa.Ques[i].question}
            op={tempOption}
            selectedOption={tempSelectedOption}
            alert={this.state.incompleteForm ? indexOf_pair(this.state.response, i) == -1 ? true : false : false}
            sendSelection={this.callBackFromQuestionDisplayCard.bind(this)}
          />
        )
      }
      this.state.newPropsRecived ? this.setState({ newPropsRecived: false }) : null
      return this.questionCard;
    }
    //after first rendering
    else
      return this.questionCard;
  }


  nextIcon() {
    switch (this.props.navigationPanelType) {
      case "first":
        return (
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Icon
                name="chevron-left"
                type="Entypo"
                size={0}
                color="#000"
                //onPress={() => this.submit()}
                style={{ fontSize: 0, marginLeft: 10 }} />
            </Left>
            <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
              <Button iconLeft rounded onPress={() => this.save()} >
                <Icon name="download" type="Entypo" />
                <Text >Save</Text>
              </Button>
            </View>
            <Right>
              <Icon
                name="chevron-right"
                type="Entypo"
                size={20}
                color="#000"
                onPress={() => this.submit()}
                style={{ fontSize: 50, marginRight: 10 }} />
            </Right>
          </View>
        )
        break;
      case "last":
        return (
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Icon //Icon to Go Back
                name="chevron-left"
                type="Entypo"
                size={20}
                color="#000"
                onPress={() => this.submit(true)}
                style={{ fontSize: 50, marginLeft: 10 }} />
            </Left>
            <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
              <Button iconLeft rounded onPress={() => this.save()} >
                <Icon name="download" type="Entypo" />
                <Text >Save</Text>
              </Button>
            </View>
            <Right>
              <Icon
                name="check"
                type="Octicons"
                size={20}
                color="#000"
                onPress={() => this.props.submit()}
                style={{ fontSize: 50, marginRight: 10 }} />
            </Right>
          </View>
        )
      case "mid":
        return (
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Icon
                name="chevron-left"
                type="Entypo"
                size={20}
                color="#000"
                onPress={() => this.submit(true)}
                style={{ fontSize: 50, marginLeft: 10 }} />
            </Left>
            <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
              <Button iconLeft rounded onPress={() => this.save()} >
                <Icon name="download" type="Entypo" />
                <Text >Save</Text>
              </Button>
            </View>
            <Right>
              <Icon
                name="chevron-right"
                type="Entypo"
                size={20}
                color="#000"
                onPress={() => this.submit()}
                style={{ fontSize: 50, marginRight: 10 }} />
            </Right>
          </View>
        )
    }
  }


  render() {
    return (
      <Content style={{ backgroundColor: "#d6d6d6" }}>
        {this.ncdQu()}
        {/* <Text>resp: {this.state.response}</Text> */}
        <Text style={{ fontSize: 8 }}></Text>
        <View style={styles.navigationPanel}>
          {this.nextIcon()}
        </View>
      </Content>
    );
  }
}

export default NcdScreen;



const styles = StyleSheet.create({
  navigationPanel: {
    backgroundColor: 'white',
    opacity: 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    right: 2,
    left: 2,
    elevation: 40
  },
});
