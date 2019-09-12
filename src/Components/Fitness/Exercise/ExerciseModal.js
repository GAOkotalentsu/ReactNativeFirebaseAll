import React, { Component } from "react";
import { StyleSheet, Dimensions, WebView, View, Platform} from "react-native";
import { Content, Container, Text, Icon, Card, CardItem, H3, H2, Body } from "native-base";
import WebViewComponent from '../WebViewComponent'
import Modal from "react-native-modal";
import AutoHeightImage from "react-native-auto-height-image";
import PushUpsImage from "../../../media/PushUps.jpg";


export default class ExerciseModal extends Component {

dataNotAvailable = "Data will be uploaded soon..."

precaution() {
  if (this.props.exercise) {
    if (this.props.exercise.precaution) {
      return (
        <Content>
          <CardItem>
            <H3 style={{ color: "#161a20" }}>Precaution:</H3>
          </CardItem>
          <CardItem>
                <Content contentContainerStyle={{ flex: 1 }}>
                  <WebViewComponent
                    source={{
                      html: "<p style='text-align: justify;'>" + `${this.props.exercise ? this.props.exercise.precaution : this.dataNotAvailable}` + "</p>"
                    }}
                  /> 
                </Content>
              </CardItem>
        </Content>
      )
    }
  }
}

  render() {

    return (
      <Modal
        animationType="slide"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", margin: 0 }}
        visible={this.props.isVisible}
        onRequestClose={() => this.props.toggleVisiblity()}
        onBackButtonPress={() => this.props.toggleVisiblity()}
        animationIn="zoomIn"
      >
        <Container style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Content padder>
           <Card>
              <CardItem header>
                <Icon
                  onPress={() => this.props.toggleVisiblity()}
                  type="AntDesign"
                  name="closecircleo"
                  style={{ fontSize: 20 }}
                />
              </CardItem>
              <CardItem>
                <H2 style={{ color: "#161a20", textDecorationLine: 'underline' }}>{this.props.exercise ? this.props.exercise.name : this.dataNotAvailable}</H2>
              </CardItem>
              <CardItem>
                <AutoHeightImage
                  width={Dimensions.get("window").width * 0.84}
                  source={PushUpsImage}
                />
              </CardItem>
              <CardItem>
              </CardItem>
              <CardItem>
                <H3 style={{ color: "#161a20" }}>Description:</H3>
              </CardItem>
              <CardItem>
                <Content contentContainerStyle={{ flex: 1 }}>
                  <WebViewComponent
                    source={{
                      html: "<p style='text-align: justify;'>" + `${this.props.exercise ? this.props.exercise.muscles : this.dataNotAvailable}` + "</p>"
                    }}
                  /> 
                </Content>
              </CardItem>
              <CardItem>
                <H3 style={{ color: "#161a20" }}>How to do:</H3>
              </CardItem>
              <CardItem>
                <Content contentContainerStyle={{ flex: 1 }}>
                  <WebViewComponent
                    source={{
                      html: "<p style='text-align: justify;'>" + `${this.props.exercise ? this.props.exercise.steps : this.dataNotAvailable}` + "</p>"
                    }}
                  /> 
                </Content>
              </CardItem>
              {this.precaution()}
            </Card>
          </Content>
        </Container> 
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center"
  },
  whyhireme_image_border: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FF4800",
    height: 100,
    margin: 50,
    justifyContent: "center"
  },
  whyhireme_image_bordertext: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    color: "#FF4800",
    flexDirection: "column",
    padding: 50
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "flex-end",
    margin: 5,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent_inputs: {
    backgroundColor: "white",
    width: 400,
    padding: 22,
    justifyContent: "flex-end",
    margin: 5,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContenttext: {
    color: "#161a20",
  },
  modalContenthead: {
    color: "#161a20",
    fontSize: 24,
    fontWeight: "300"
  },
  pr_onboarding_next: {
    backgroundColor: "#4BA1FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4BA1FF",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    padding: 15,
    justifyContent: "flex-end",
    margin: 5
  },
  pr_onboarding_skip: {
    color: "#cccccc",
    fontSize: 20,
    fontWeight: "500",
    margin: 5
  },
  pr_onboarding_inputfield: {
    fontSize: 18,
    fontWeight: "300",
    color: "#161a20",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    width: 350
  },
  pr_onboarding_inputdate: {
    fontSize: 18,
    fontWeight: "300",
    color: "#161a20",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    margin: 5
  },
  pr_text_label: {
    fontSize: 14,
    fontWeight: "300",
    color: "#cccccc",
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  onboarding_addanother: { fontSize: 18, fontWeight: "300", color: "#cccccc" },
  onboarding_addbutton: {
    width: 32,
    height: 32,
    position: "relative",
    bottom: 20,
    left: 100
  },
  pr_onboarding_skillsborder: {
    borderWidth: 1,
    borderColor: "#FF4800",
    borderRadius: 10,
    margin: 5
  },
  pr_onboarding_skillstext: {
    color: "#FF4800",

    padding: 5,
    fontSize: 16,
    fontWeight: "100"
  },
  pr_onboarding_skillstitle: {
    fontSize: 20,
    fontWeight: "300"
  },
  onboarding_videoborder: {
    borderColor: "#FF4800",
    borderRadius: 3,
    borderWidth: 1,
    margin: 10,
    height: 100
  },
  onboarding_videotext: {
    color: "#FF4800",
    fontSize: 20,
    fontWeight: "300",
    padding: 40,
    paddingLeft: 120
  }
});
