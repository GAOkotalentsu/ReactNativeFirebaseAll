import React, { Component } from "react";
import {View} from "react-native";
import { Container, Drawer } from "native-base";
import HeaderWrapper from "./HeaderWrapper";
import CustomContainer from "./CustomContainer";
import FooterWrapper from "./FooterWrapper";
import DrawerContent from "./DrawerContent";

export default class AppDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: ["e-Diagnosis", "Health History", "iHeal365 Gym"],
      activeFooterKey: 1,
      footerTabName: ["DiagnosisScreen", "Document", "Fitness"]
    };
  }

  callBackFromFooter = tabNumber =>
    this.setState({ activeFooterKey: tabNumber });

  renderScreen = () => {
    return (
      <CustomContainer
        tab={this.state.activeFooterKey}
        callBackFromCustomContainer={this.callBackFromCustomContainer.bind(this)}
      />
    );
  };

  callBackFromCustomContainer = ButtonClicked => this.props.navigation.navigate(ButtonClicked);

  closeDrawer() {
    _drawer._root.close();
  }

  openDrawer() {
    _drawer._root.open();
  }

  drawerStyles = {
    drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 }
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          _drawer = ref;
        }}
        content={<DrawerContent navigator={this._navigator} />}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        type="overlay"
        tapToClose={true}
        negotiatePan={false}
        panOpenMask={0.1}
      //styles={{drawer: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 3},
      //main: {paddingLeft: 3}}}
      >
        <Container>
          <View style={{elevation:20}}>
          <HeaderWrapper headerName={this.state.headerName[this.state.activeFooterKey - 1]} drawerprop={this.openDrawer} />
          </View>
          {this.renderScreen()}
          <FooterWrapper
            activeFooterKey={this.state.activeFooterKey}
            callBackFromFooter={this.callBackFromFooter.bind(this)}
          />
        </Container>
      </Drawer>
    );
  }
}
