import React, { Component } from "react";
import { Alert, ScrollView, StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import { Content, Container, Text, Card, CardItem, Right, Label, Item, Icon, Input, Picker } from "native-base";
//import Icon from 'react-native-vector-icons';
import Modal from "react-native-modal";
import { connect } from "react-redux";


class ModalDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 1,
            gender: null,
            name: '',
            v: true
        }
    }


    Submit(selectedOption) {
        if (selectedOption === '2')
            this.props.callBackFromNcdScreen(this.state.gender, this.state.name)
        else if (selectedOption === '1') {
            this.props.callBackFromNcdScreen("male", "abhishek")
        }
    }


    submitAction() {
        if (!!this.state.selectedOption) {
            if (this.state.selectedOption === 2) {
                if (!!this.state.name) {
                    if (!!this.state.gender) {
                        this.Submit("2");
                    }
                    else
                        this.alertMsg("Please select your gender");
                }
                else
                    this.alertMsg("Please enter the Name");
            }
            else
                this.Submit("1");
        }
        else this.alertMsg("Pleae select one of the option");
    }


    alertMsg(txt) {
        Alert.alert(
            '!',
            txt,
            [],
            { cancelable: true }
        )
    }


    otherPersonDetail() {
        if (this.props.type === "info") {
            return (
                <Content padder>
                    <Item floatingLabel style={{ width: "80%", marginLeft: "5%" }}>
                        <Label>Name</Label>
                        <Input textContentType="name" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                    </Item>
                    <Text style={{ fontSize: 10 }}>{"\n"}</Text>
                    <Picker padding
                        mode="dropdown"
                        style={{ width: "50%", marginLeft: "4%" }}
                        selectedValue={this.state.gender}
                        onValueChange={(value) => this.setState({ gender: value })}
                    >
                        <Picker.Item label="Gender" value={null} />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </Content>
            )
        }
        else {
            return (
                null
            )
        }
    }


    toggleVisiblity = () => this.setState({ v: !this.state.v })


    render() {
        return (
            <Container style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Modal
                    style={{ marginTop: "20%" }}
                    animationType="slide"
                    visible={this.state.v}
                //onRequestClose={() => this.toggleVisiblity()}
                //onBackButtonPress={() => this.toggleVisiblity()}
                >
                    <Content>
                        <Card>
                            <CardItem>
                                <Text>Diagnos for self or other?</Text>
                            </CardItem>

                            <TouchableOpacity onPress={() => this.setState({ selectedOption: 1 })} >
                                <CardItem row >
                                    <Text><Icon
                                        name={this.state.selectedOption ? this.state.selectedOption == 1 ? "md-radio-button-on" : "md-radio-button-off" : "md-radio-button-off"}
                                        size={20}
                                        type="Ionicons"
                                        color="#000" />  Self</Text>
                                </CardItem>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ selectedOption: 2 })} >
                                <CardItem row >
                                    <Text><Icon
                                        name={this.state.selectedOption ? this.state.selectedOption == 2 ? "md-radio-button-on" : "md-radio-button-off" : "md-radio-button-off"}
                                        size={20}
                                        type="Ionicons"
                                        color="#000" />  other</Text>
                                </CardItem>
                            </TouchableOpacity>
                            {this.state.selectedOption == 2 ? this.otherPersonDetail() : null}
                            <Text>{"\n"}</Text>
                            <View style={{ justifyContent: "center", alignItems: "center", fontSize: 50 }} >
                                <Icon
                                    name="rightcircleo"
                                    type="AntDesign"
                                    size={20}
                                    color="#000"
                                    onPress={() => this.submitAction()}
                                    style={{ fontSize: 50 }} />
                            </View>
                            <Text style={{ fontSize: 10 }}>{"\n"}</Text>
                        </Card>
                    </Content>
                </Modal >
            </Container>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}



export default connect(mapStateToProps, null)(ModalDisplay)