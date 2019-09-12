import React from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Label, Input, Icon, Left, Item, Right, Card, CardItem } from "native-base";

export default class Diabetes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: !!this.props.response[0] || this.props.response[1] ? 1 : this.props.isCompleted ? 2 : null,
            randomBloodSugar: this.props.response ? this.props.response[0] : null,
            fastingBloodSugar: this.props.response ? this.props.response[1] : null,
            hourBloodSugar: this.props.response ? this.props.response[2] : null,
        }
    }
    questionCard = [];


    submit(isCompleted = false, goBack = false, save = false) {
        res = new Array;
        res.push(!!this.state.randomBloodSugar && this.state.selectedOption == '1' ? this.state.randomBloodSugar : 0);
        res.push(!!this.state.fastingBloodSugar && this.state.selectedOption == '1' ? this.state.fastingBloodSugar : 0);
        res.push(!!this.state.hourBloodSugar && this.state.selectedOption == '1' ? this.state.hourBloodSugar : 0);
        this.props.submit("Diabetes", res, isCompleted, save, goBack);
    }


    inputValidation() {
        if (!!this.state.randomBloodSugar)
            this.submit(true)
        else if (!!this.state.fastingBloodSugar || !!this.state.hourBloodSugar) {
            if (!!this.state.fastingBloodSugar && !!this.state.hourBloodSugar)
                this.submit(true)
            else if (!!this.state.hourBloodSugar) {
                Alert.alert(
                    'Alert',
                    "Please give the two hour blood glucose reading also",
                    [],
                    { cancelable: true }
                )
            }
            else if (!!this.state.fastingBloodSugar) {
                Alert.alert(
                    'Alert',
                    "Please give the fasting blood glucose reading also",
                    [],
                    { cancelable: true }
                )
            }
        }
        else {
            if (this.state.selectedOption === 2) {
                this.MOAlert();
            }
            else {
                Alert.alert(
                    'Alert',
                    "Please give your response to the above question.\nYou can also save the response to continue later.",
                    [],
                    { cancelable: true }
                )
            }

        }
    }


    save() {

    }

    nextIcon() {
        switch (this.props.navigationPanelType) {
            case "first":
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Left>
                            <Icon
                                name="chevron-left"
                                type="Entypo"
                                size={0}
                                color="#000"
                                // onPress={() => this.inputValidation()}
                                style={{ fontSize: 0, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.submit(false, false, true)} >
                                <Icon name="download" type="Entypo" />
                                <Text >Save</Text>
                            </Button>
                        </View>
                        <Right>
                            <Icon
                                name="chevron-right"
                                type="Entypo"
                                size={20}
                                color="#000"
                                onPress={() => this.inputValidation()}
                                style={{ fontSize: 50, marginRight: 10 }} />
                        </Right>
                    </View>
                )
                break;
            case "last":
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Left>
                            <Icon
                                name="chevron-left"
                                type="Entypo"
                                size={20}
                                color="#000"
                                onPress={() => this.submit(false, true)}
                                style={{ fontSize: 50, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.submit(false, false, true)} >
                                <Icon name="download" type="Entypo" />
                                <Text >Save</Text>
                            </Button>
                        </View>
                        <Right>
                            <Icon
                                name="check"
                                type="Octicons"
                                size={20}
                                color="#000"
                                onPress={() => this.inputValidation()}
                                style={{ fontSize: 50, marginRight: 10 }} />
                        </Right>
                    </View>
                )
                break;
            case "mid":
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Left>
                            <Icon
                                name="chevron-left"
                                type="Entypo"
                                size={20}
                                color="#000"
                                onPress={() => this.submit(true, true)}
                                style={{ fontSize: 50, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.submit(false, false, true)} >
                                <Icon name="download" type="Entypo" />
                                <Text>Save</Text>
                            </Button>
                        </View>
                        <Right>
                            <Icon
                                name="chevron-right"
                                type="Entypo"
                                size={20}
                                color="#000"
                                onPress={() => this.inputValidation()}
                                style={{ fontSize: 50, marginRight: 10 }} />
                        </Right>
                    </View>
                )
                break;
        }
    }


    MOAlert(goBack = false) {
        if (!!goBack) {
            this.submit(true, true);
        }
        else {
            Alert.alert(
                'BP reading',
                "Please ask your medical officer to take your Diabetes test.",
                [
                    { text: 'Back' },
                    {
                        text: 'Ok',
                        onPress: () => this.submit(true),
                    },
                ],
                { cancelable: false }
            )
        }
    }

    saveAlert() {
        Alert.alert(
            'BP reading',
            "Your can save your progress by pressing Save and then continue when you have your test results.",
            [
                { text: 'Back' },
                { text: 'Ok', },
            ],
            { cancelable: false }
        )
    }

    diabetesReading() {
        if (this.state.selectedOption === 1) {
            return (
                <View>
                    <CardItem>
                        <Text>Please give your test results</Text>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Random blood glucose level</Label>
                            <Input value={this.state.randomBloodSugar} textContentType="none" onChangeText={(randomBloodSugar) => this.setState({ randomBloodSugar })} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Fasting blood glucose</Label>
                            <Input value={this.state.fastingBloodSugar} textContentType="none" onChangeText={(fastingBloodSugar) => this.setState({ fastingBloodSugar })} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Two hour blood glucose</Label>
                            <Input value={this.state.hourBloodSugar} textContentType="none" onChangeText={(hourBloodSugar) => this.setState({ hourBloodSugar })} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Text onPress={() => this.saveAlert()}>{"\n \nDon't remember test results?"}</Text>
                    </CardItem>
                </View>
            );
        }
        else
            return null;
    }


    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: "#d6d6d6" }}>
                <Text>{"\n"}</Text>
                <View style={{ marginHorizontal: 6, marginVertical: 1, borderRadius: 5 }}>
                    <Card>
                        <CardItem>
                            <Text>Are you tested for diabetes in last 2 months?</Text>
                        </CardItem>
                        <CardItem>
                            <TouchableOpacity onPress={() => this.setState({ selectedOption: 1 })}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name={this.state.selectedOption === 1 ? "md-radio-button-on" : "md-radio-button-off"} type="Ionicons" size={20} color="#000" />
                                    <Text>  {"Yes"}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ selectedOption: 2 })}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name={this.state.selectedOption === 2 ? "md-radio-button-on" : "md-radio-button-off"} type="Ionicons" size={20} color="#000" />
                                    <Text>  {"No"}</Text>
                                </View>
                            </TouchableOpacity>
                        </CardItem>
                        {this.diabetesReading()}
                    </Card>
                </View>

                <View style={styles.navigationPanel}>
                    {this.nextIcon()}
                </View>

            </Container>
        );
    }
}



const styles = StyleSheet.create({
    navigationPanel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 40,
        backgroundColor: 'white',
        opacity: 0.9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});