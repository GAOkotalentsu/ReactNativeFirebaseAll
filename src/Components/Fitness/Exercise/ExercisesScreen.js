import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { Container, Content, Header, Button, Text, Col, Drawer } from "native-base";
import ExerciseModal from "./ExerciseModal";
import DrawerContent from "../../DrawerContent";
import HeaderWrapper from "../../HeaderWrapper";
import exerciseContent from "./exerciseContent";
import CardDisplay from "./CardDisplay";

export default class ExercisesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            cardNumberPressed: null,
            ex: {
                "name": "demo",
                "detail": "demo details"
            }
        }
    }


    toggleVisiblity = () => this.setState({ isVisible: !this.state.isVisible })


    closeDrawer = () => _drawer._root.close()
    openDrawer = () => _drawer._root.open()

    drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
        main: { paddingLeft: 3 },
    }


    callBackFromExScreen = (id) => this.setState({ cardNumberPressed: id, isVisible: true })


    modal() {
        if (!!this.state.isVisible) {
            item = this.exerciseArray[this.state.cardNumberPressed - 1] ? this.exerciseArray[this.state.cardNumberPressed - 1] : this.state.ex;
            return (
                <ExerciseModal exercise={item} isVisible={this.state.isVisible} toggleVisiblity={this.toggleVisiblity.bind(this)} />
            )
        }
        else
            return <ExerciseModal isVisible={this.state.isVisible} />;
    }


    exerciseArray = [];
    exercises() {
        if (this.exerciseArray.length === 0) {
            this.exerciseArray = [];
            let data = exerciseContent();
            for (let i = 1; i <= data.numberOfexercise; i++) {
                this.exerciseArray.push(
                    data.exercise[i]
                )
            }
            return this.exerciseArray
        }
        else
            return this.exerciseArray
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
                    <ImageBackground source={require("../../../media/Exercise1.png")} style={{ width: '100%', height: '100%' }}>
                        <Content>
                            {this.modal()}
                            <HeaderWrapper headerName={"Exercises"} drawerprop={this.openDrawer} />
                            <Content style={{ flex: 1 }}>
                                <FlatList
                                    data={this.exercises()}
                                    renderItem={({ item }) => <CardDisplay exName={item.name} id={item.id} callBackFromExScreen={this.callBackFromExScreen.bind(this)} />}
                                    keyExtractor={item => item.id}
                                />
                            </Content>
                        </Content>
                    </ImageBackground>
                </Container>
            </Drawer>
        )
    }
}