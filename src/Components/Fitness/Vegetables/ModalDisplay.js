import React, { Component } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Dimensions,
    WebView,
    Image,
    View
} from "react-native";
import {
    Content,
    Container,
    Icon,
    Card,
    CardItem,
    Right,
    Text,
    H2,
    H3
} from "native-base";
import Modal from "react-native-modal";
import AutoHeightImage from "react-native-auto-height-image";
import WebViewComponent from '../WebViewComponent'


export default class ModalDisplay extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", margin: 0 }}
                visible={this.props.isVisible}
                onRequestClose={() => this.props.toggleVisiblity()}
                onBackButtonPress={() => this.props.toggleVisiblity()}
            >
                <Container style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Content padder>
                        <ScrollView>
                            <Card>
                                <CardItem header>
                                    <Icon
                                        onPress={() => this.props.toggleVisiblity()} type="AntDesign" name="closecircleo" style={{ fontSize: 20 }} />
                                </CardItem>
                                <CardItem>
                                    <Text>{this.props.veg.name ? this.props.veg.name : "Demo"}</Text>
                                </CardItem>
                                <CardItem>

                                    <AutoHeightImage
                                        width={Dimensions.get("window").width * 0.84}
                                        source={{ uri: (this.props.veg.media ? ('https://drive.google.com/uc?id=' + this.props.veg.media) : 'https://drive.google.com/uc?id=1TOpekW8A9ExsAwg-QvPqtpLQFSLk-zne') }}
                                    />

                                </CardItem>
                                <CardItem>
                                    <H2>Description:</H2>
                                </CardItem>
                                <CardItem>
                                    <Content contentContainerStyle={{ flex: 1 }}>
                                        <WebViewComponent
                                            source={{
                                                html: "<p style='text-align: justify;'>" + `${this.props.veg.description? this.props.veg.description : "Description not available"}` + "</p>"
                                            }}
                                        /> 
                                    </Content>
                                </CardItem>
                                <CardItem>
                                    <H2>Nutrition:</H2>
                                </CardItem>
                                <CardItem>
                                    <Content contentContainerStyle={{ flex: 1 }}>
                                        <WebViewComponent
                                            source={{
                                                html: "<p style='text-align: justify;'>" + `${this.props.veg.nutrition ? this.props.veg.nutrition : "  Nutrition details not available!"}` + "</p>"
                                            }}
                                        /> 
                                    </Content>
                                </CardItem>
                                <CardItem>
                                    <H2>Benefits:</H2>
                                </CardItem>
                                <CardItem>
                                    <Content contentContainerStyle={{ flex: 1 }}>
                                        <WebViewComponent
                                            source={{
                                                html: "<p style='text-align: justify;'>" + `${this.props.veg.benefits ? this.props.veg.benefits : "  Benefits details not available!"}` + "</p>"
                                            }}
                                        /> 
                                    </Content>
                                </CardItem>
                            </Card>
                        </ScrollView>
                    </Content>
                </Container>
            </Modal>
        );
    }
}

