import React from "react";
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { Text, Card, CardItem } from "native-base";

export default class CardDisplay extends React.Component {


    handleCallBack() {
        if (this.props.parent === "WorkoutPlanScreen") {
            this.props.callBackFromWorkoutPlanScreen(this.props.item)
        }
        else if (this.props.parent === "WorkoutPlanScreenL2") {
            this.props.callBackFromWorkoutPlanScreenL2(this.props.item)
        }
    }


    renderMain() {
        if (this.props.parent === "WorkoutPlanScreen") {
            return (
                <CardItem header button onPress={() => this.handleCallBack()}>
                    <Text>{this.props.item.name}</Text>
                </CardItem>
            )
        }
        else if (this.props.parent === "WorkoutPlanScreenL2") {
            return (
                <CardItem bordered={true}>
                    <Text>{this.props.item.name}</Text>
                    <Icon name="info" size={20} color="#009" style={{ position: 'absolute', right: 15 }} onPress={() => this.handleCallBack()} />
                </CardItem>
            )
        }
    }


    render() {
        return (
            <View>
                <Card transparent >
                    {this.renderMain()}
                </Card>
            </View>
        )
    }
}