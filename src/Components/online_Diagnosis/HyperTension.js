import React from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Label, Input, Icon, Left, Item, Right, Card, CardItem, Footer, FooterTab } from "native-base";

export default class BreastCancerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: !!this.props.response ? 1 : this.props.isCompleted ? 2 : null,
            BP: this.props.response ? this.props.response : null,
        }
    }
    questionCard = [];


    submit(goBack = false) {
        if (!!this.state.BP) {
            res = this.state.BP
            this.props.submit("HyperTension", res && this.state.selectedOption == '1' ? res : 0, true, false, goBack)
        }
        else {
            if (this.state.selectedOption === 2) {
                this.MOAlert(goBack);
                //Save is on click of MOAlert()
            }
            else {
                Alert.alert(
                    'Alert',
                    "Please give your BP reading or you can ask the medical officer to take your BP reading.",
                    [],
                    { cancelable: true }
                )
            }
        }
    }


    save() {
        res = this.state.BP
        this.props.submit("HyperTension", res && this.state.selectedOption == '1' ? res : 0, false)
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
                                // onPress={() => this.submit()}
                                style={{ fontSize: 0, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.save()} >
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
                                onPress={() => this.submit()}
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
                                onPress={() => this.submit(true)}
                                style={{ fontSize: 50, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.save()} >
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
                                onPress={() => this.submit()}
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
                                onPress={() => this.submit(true)}
                                style={{ fontSize: 50, marginLeft: 10 }} />
                        </Left>
                        <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                            <Button iconLeft rounded onPress={() => this.save()} >
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
                                onPress={() => this.submit()}
                                style={{ fontSize: 50, marginRight: 10 }} />
                        </Right>
                    </View>
                )
                break;
        }
    }


    MOAlert(goBack = false) {
        if (!!goBack) {
            this.props.submit("HyperTension", this.state.BP && this.state.selectedOption == '1' ? res : 0, true, false, true)
        }
        else {
            Alert.alert(
                'BP reading',
                "Please ask your medical officer to take your BP reading.",
                [
                    { text: 'Back' },
                    {
                        text: 'Ok',
                        onPress: () => this.props.submit("HyperTension", this.state.BP && this.state.selectedOption == '1' ? res : 0, true),
                    },
                ],
                { cancelable: false }
            )
        }
    }


    BPReading() {
        if (this.state.selectedOption === 1) {
            return (
                <View>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Please enter your BP reading</Label>
                            <Input value={this.state.BP} textContentType="none" onChangeText={(BP) => this.setState({ BP })} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Text onPress={() => this.MOAlert()}>{"\n \n* Don't remember BP reading."}</Text>
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
                            <Text>Have you taken your Blood Pressure within last 5 days?</Text>
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
                        {this.BPReading()}
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