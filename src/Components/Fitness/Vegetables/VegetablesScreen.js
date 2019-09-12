import React from "react";
import { FlatList, ImageBackground } from "react-native";
import { Container, Content, Header, Button, Text, Col, Drawer, List, ListItem, H1, H2, Card, CardItem } from "native-base";
import ModalDisplay from "./ModalDisplay";
import DrawerContent from "../../DrawerContent";
import HeaderWrapper from "../../HeaderWrapper";
import VegetablesContent from "./VegetablesContent";
import CardDisplay from "./CardDisplay";

export default class VegetablesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            isVisibleTwo: false,
            veg: {
                "name": null,
                "description": null,
                "nutrition": null,
                "benefits": null,
                "media": null,
            },
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        }
    }


    toggleVisiblity = () => this.setState({ isVisible: !this.state.isVisible })


    closeDrawer = () => _drawer._root.close()
    openDrawer = () => _drawer._root.open()

    drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
        main: { paddingLeft: 3 },
    }


    callBackFromCardDisplay = (tempveg) => this.setState({ veg: tempveg, isVisible: true })


    modal() {
        return <ModalDisplay veg={this.state.veg} isVisible={this.state.isVisible} toggleVisiblity={this.toggleVisiblity.bind(this)} />;
    }


    vegArray = [];
    veg(monthName) {
        this.vegArray = [];
        vegData = VegetablesContent();
        for (let i = 1; i <= vegData[monthName].totalNumbers; i++) {
            vegData[monthName][i].id = i
            this.vegArray.push(
                vegData[monthName][i]
            )
        }
        return this.vegArray
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
                panOpenMask={0.1}
            >
                <Container>
                    {this.modal()}
                    <HeaderWrapper name={"Seasonal Vegetables"} drawerprop={this.openDrawer} />
                    <Content>
                        {
                            this.state.months.map((op, key) => {
                                Arr = this.veg(op)
                                return ([
                                    <Text key={key.toString() + "1"} style={{ fontSize: 20, fontWeight: 'bold', }}>{op}</Text>,
                                    <CardItem cardBody key={key.toString()}>
                                        <Content horizontal={true} showsHorizontalScrollIndicator={false} >
                                            {
                                                Arr.map((opp, key) => {
                                                    return (
                                                        <CardDisplay
                                                            veg={opp}
                                                            key={toString(opp.id)}
                                                            callBackFromVegetableScreen={this.callBackFromCardDisplay.bind(this)}
                                                        />
                                                    )
                                                })
                                            }
                                        </Content>
                                    </CardItem>
                                ])
                            })
                        }
                    </Content>
                </Container>
            </Drawer>
        )
    }
}