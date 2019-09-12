import React, { Component } from "react";
import { Content, Button, Text, Container, Input, Item, Row, Label, Spinner, Left, Right, Header, Body, Title, Footer, FooterTab, } from "native-base";
import { Image, Dimensions, View, ProgressBarAndroid } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import exerciseContent from "../../Exercise/exerciseContent";
import AutoHeightImage from "react-native-auto-height-image";


class WorkoutPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ex: [1, 2, 3],
            con: ['gif.gif', 'gif.gif', 'gif.gif']
        }
    }


    render() {
        return (
            <Container style={{ backgroundColor: "#87cefa" }}>

                <Header transparent>
                    <Left>
                        <Button transparent>
                            <Icon
                                // onPress={() => this.props.toggleVisiblity()}
                                name="md-close"
                                style={{ fontSize: 40 }}
                            />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: 50 }}>
                        <Title style={{ alignSelf: "center" }}>exercise name</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon
                                // onPress={() => this.props.toggleVisiblity()}
                                name="md-refresh"
                                style={{ fontSize: 40 }}
                            />
                        </Button>
                    </Right>
                </Header>


                <Content >
                    <AutoHeightImage
                        width={Dimensions.get("window").width}
                        source={require("../../../../media/gif.gif")}
                    />

                    <Text>{"\n\n"}</Text>

                    <View style={{ paddingHorizontal: 20 }}>
                        <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={1}
                        />
                    </View>

                </Content>


                <Footer style={{
                    marginBottom: 10,
                    elevation: 0
                }}>
                    <FooterTab transparent style={{ backgroundColor: '#87cefa' }}>
                        <Button transparent>
                            <Icon
                                // onPress={() => this.props.toggleVisiblity()}
                                name="ios-arrow-dropleft"
                                style={{ fontSize: 50 }}
                            />

                        </Button>
                        <Body>
                            <Text style={{ fontSize: 30 }}>7 / 10</Text>
                        </Body>
                        <Button transparent>
                            <Icon
                                // onPress={() => this.props.toggleVisiblity()}
                                name="ios-arrow-dropright"
                                style={{ fontSize: 50 }}
                            />
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default WorkoutPlayer