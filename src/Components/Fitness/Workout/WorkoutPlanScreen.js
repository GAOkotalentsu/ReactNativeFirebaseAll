import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { Container, Content, Header, Button, Text, Col, Drawer } from "native-base";
import ExerciseModal from "../Exercise/ExerciseModal";
import DrawerContent from "../../DrawerContent";
import HeaderWrapper from "../../HeaderWrapper";
import CardDisplay from "./CardDisplay";
import workoutContent from "./workoutContent";


class WorkoutPlanScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workoutContent: workoutContent(),
            isVisible: false,
            cardNumberPressed: null,
            ex: {
                "id": "1",
                "name": "Content Not Available",
                "muscles": "Content Not Available",
                "precaution": "Content Not Available",
                "media": null
            },
        }
    }


    toggleVisiblity = () => this.setState({ isVisible: !this.state.isVisible })


    closeDrawer = () => _drawer._root.close()
    openDrawer = () => _drawer._root.open()

    drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
        main: { paddingLeft: 3 },
    }


    callBackFromCardDispay = (plan) => this.props.navigation.navigate("planScreen", { plan: plan });


    workoutArray = [];
    workoutPlans() {
        if (this.workoutArray.length === 0) {
            this.workoutArray = [];
            let data = workoutContent();
            for (let i = 1; i <= data.numberOfWorkouts; i++) {
                this.workoutArray.push(
                    data[i]
                )
            }
            return this.workoutArray
        }
        else
            return this.workoutArray
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
                    <ImageBackground source={require("../../../media/Exercise1.png")} style={{ flex: 1 }} resizeMode={"cover"} >
                        <Content style={{ flex: 1 }}>
                            <HeaderWrapper headerName={"Workout Plans"} drawerprop={this.openDrawer} />
                            <Content style={{ flex: 1 }}>
                                <FlatList
                                    data={this.workoutPlans()}
                                    renderItem={({ item }) => <CardDisplay parent={"WorkoutPlanScreen"} item={item} callBackFromWorkoutPlanScreen={this.callBackFromCardDispay.bind(this)} />}
                                    keyExtractor={item => item.id}
                                />
                            </Content>
                        </Content>
                    </ImageBackground>
                </Container>
            </Drawer>
        );
    }
}

export default WorkoutPlanScreen