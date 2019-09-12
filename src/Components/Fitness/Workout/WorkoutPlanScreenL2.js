import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { Container, Content, Header, Button, Text, Col, Drawer, Fab } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawerContent from "../../DrawerContent";
import HeaderWrapper from "../../HeaderWrapper";
import ExerciseModal from "../Exercise/ExerciseModal";
import exerciseContent from "../Exercise/exerciseContent";
import CardDisplay from "./CardDisplay";
import WebViewComponent from '../WebViewComponent'


class WorkoutPlanScreenL2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            cardNumberPressed: null,
            planContent: this.props.navigation.getParam('plan', null),
            ex: {
                "id": "1",
                "name": "Content Not Available",
                "muscles": "Content Not Available",
                "precaution": "Content Not Available",
                "media": null
            }
        }
    }

    callBackFromCardDispay = (item) => this.setState({ ex: item, isVisible: true });


    toggleVisiblity = () => this.setState({ isVisible: !this.state.isVisible })


    closeDrawer = () => _drawer._root.close()
    openDrawer = () => _drawer._root.open()
    drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
        main: { paddingLeft: 3 },
    }


    modal() {
        if (!!this.state.isVisible) {
            return (
                <ExerciseModal exercise={this.state.ex} isVisible={this.state.isVisible} toggleVisiblity={this.toggleVisiblity.bind(this)} />
            )
        }
        else
            return <ExerciseModal isVisible={this.state.isVisible} />;
    }


    exercises = [];
    loadExercises() {
        if (this.exercises.length === 0) {
            ex = this.state.planContent.exercises;
            this.exercises = [];
            let data = exerciseContent();
            for (let i = 1; i <= ex.length; i++) {
                this.exercises.push(
                    data.exercise[ex[i - 1]]
                )
            }
            return this.exercises
        }
        else
            return this.exercises
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
                elevation={50}
            >
                <Container>
                    <Fab
                        style={{ backgroundColor: '#5067FF', elevation: 9 }}
                        position="bottomRight"
                        direction="up"
                    // onPress={() => this.setState({ active: !this.state.active })}
                    >
                    <Icon nam1e="play" color="#009" style={{ fontSize: 35, alignSelf: "center" }} />
                    </Fab>
                    <Content>
                        {this.modal()}
                        <HeaderWrapper headerName={this.state.planContent ? this.state.planContent.name : "Demo Plans"} drawerprop={this.openDrawer} />
                        <Content style={{ flex: 1 }}>
                            <WebViewComponent
                    source={{
                      html: "<p style='text-align: justify;'>" + `${this.state.planContent ? this.state.planContent.description : "Demo Description"}` + "</p>"
                    }}
                  /> 
                            <FlatList
                                data={this.loadExercises()}
                                renderItem={({ item }) => <CardDisplay parent={"WorkoutPlanScreenL2"} item={item} callBackFromWorkoutPlanScreenL2={this.callBackFromCardDispay.bind(this)} />}
                                keyExtractor={item => item.id}
                            />
                            <Text>{"\n\n\n"}</Text>
                        </Content>
                    </Content>
                </Container>
            </Drawer>
        );
    }
}

export default WorkoutPlanScreenL2