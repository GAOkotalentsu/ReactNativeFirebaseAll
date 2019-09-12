import React, { Component } from "react";
import { Content, Button, Text, Card, CardItem } from "native-base";
import { Image, Dimensions, View, StyleSheet } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

export default class FitnessScreen extends Component {

    render() {
        return (
            <Content style={{ backgroundColor: '#6dc5ac' }}>
                <AutoHeightImage
                    width={Dimensions.get("window").width}
                    source={require("../../media/WelcomeGym.png")}
                />

                <Card style={styles.card}>
                    <CardItem cardBody style={styles.cardItem} activeOpacity={0.85} button onPress={() => this.props.passCallBackFromCustomContainer('exercises')}>
                        <Image source={require("../../media/Exercises.png")} style={{ height: 240, width: null, flex: 1, borderRadius: 10, }} />
                    </CardItem>
                </Card>
                <Card style={styles.card}>
                    <CardItem cardBody style={styles.cardItem} activeOpacity={0.85} button onPress={() => this.props.passCallBackFromCustomContainer('workout')} >
                        <Image source={require("../../media/Workout.png")} style={{ height: 240, width: null, flex: 1, borderRadius: 10, }} />
                    </CardItem>
                </Card>
                <Card style={styles.card}>
                    <CardItem cardBody style={styles.cardItem} activeOpacity={0.85} button onPress={() => this.props.passCallBackFromCustomContainer('vegetables')} >
                        <Image source={require("../../media/Vegetables.png")} style={{ height: 240, width: null, flex: 1, borderRadius: 10, }} />
                    </CardItem>
                </Card>
                <Card style={styles.card}>
                    <CardItem cardBody style={styles.cardItem} activeOpacity={0.85} button onPress={() => this.props.passCallBackFromCustomContainer('fruit')} >
                        <Image source={require("../../media/Fruits.png")} style={{ height: 240, width: null, flex: 1, borderRadius: 10, }} />
                    </CardItem>
                </Card>

            </Content>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        //paddingTop: 20,
        //paddingBottom: 20,
        borderRadius: 10,
        //borderWidth: 1,
    },
    cardItem: {
        borderRadius: 10,
    },
});