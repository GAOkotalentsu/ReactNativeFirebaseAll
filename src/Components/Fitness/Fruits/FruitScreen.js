import React from "react";
import { FlatList, ImageBackground } from "react-native";
import { Container, Content, Header, Button, Text, Col, Drawer, List, ListItem, H1, H2, Card, CardItem } from "native-base";
import ModalDisplay from "../Vegetables/ModalDisplay";
import DrawerContent from "../../DrawerContent";
import HeaderWrapper from "../../HeaderWrapper";
import FruitsContent from "./FruitsContent";
import CardDisplay from "../Vegetables/CardDisplay";

export default class FruitScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            isVisibleTwo: false,
            fruit: {
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


    callBackFromCardDisplay = (tempFruit) => this.setState({ fruit: tempFruit, isVisible: true })


    modal() {
        return <ModalDisplay veg={this.state.fruit} isVisible={this.state.isVisible} toggleVisiblity={this.toggleVisiblity.bind(this)} />;
    }


    fruitArray = [];
    fruit(monthName) {
        this.fruitArray = [];
        fruitData = FruitsContent();
        for (let i = 1; i <= fruitData[monthName].totalNumbers; i++) {
            fruitData[monthName][i].id = i
            this.fruitArray.push(
                fruitData[monthName][i]
            )
        }
        return this.fruitArray
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
                    <HeaderWrapper name={"Seasonal Fruit"} drawerprop={this.openDrawer} />
                    <Content>
                        {
                            this.state.months.map((op, key) => {
                                Arr = this.fruit(op)
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