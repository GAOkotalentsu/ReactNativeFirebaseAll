import React, { Component } from "react";
import { Container, Drawer } from "native-base";
import HeaderWrapper from "./HeaderWrapper";
import CustomContainer from "./CustomContainer";
import FooterWrapper from "./FooterWrapper";
import DrawerContent from "./DrawerContent";


export default class MainAppDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerActiveTab: 'fitness'
    }
  }



  callBackFromFooter = (tabName) => {
    this.setState({ footerActiveTab: tabName })
  }

  renderScreen = () => {
    return <CustomContainer tab={this.state.footerActiveTab ? this.state.footerActiveTab : "Fitness"} />
  }


  closeDrawer() {
    _drawer._root.close()
  };

  openDrawer() {
    _drawer._root.open()
  };

  drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
  }

  render() {
    return (
        <Drawer
          ref={(ref) => { _drawer = ref; }}
          content={<DrawerContent navigator={this._navigator} />}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          type="overlay"
          tapToClose={true}
          negotiatePan={true}
          panOpenMask={0.05}
        //styles={{drawer: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 3},
        //main: {paddingLeft: 3}}}
        >
          <Container>
            <HeaderWrapper headerName ="Header" drawerprop={this.openDrawer} />
            {this.renderScreen()}
            <FooterWrapper callBackFromFooter={this.callBackFromFooter.bind(this)} />
          </Container>
        </Drawer>
    );
  }
}
