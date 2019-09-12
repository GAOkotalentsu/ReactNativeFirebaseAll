import React from "react";
import { View, ImageBackground } from 'react-native';
import { Content, Header, Button, Text, Col, Grid, Container, Card, CardItem, Body } from "native-base";

export default class CardDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            exn: []
        }
    }

    /*componentDidMount() {
        this.setState({ exn: this.props.exx })
    }*/


    onClickHandle() {
        this.props.callBackFromVegetableScreen(this.props.veg)
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem cardBody button onPress={() => this.onClickHandle()}>
                        <ImageBackground source={{ uri: (this.props.veg.media ? ('https://drive.google.com/uc?id=' + this.props.veg.media) : 'https://drive.google.com/uc?id=1TOpekW8A9ExsAwg-QvPqtpLQFSLk-zne') }} style={{ width: 200, height: 200 }} >
                            <Text style={{ textAlignVertical: 'bottom' }} >{this.props.veg.name}</Text>
                        </ImageBackground>
                    </CardItem>
                </Card>
            </View>
        )
    }


    /*
        render() {
            return (
                this.state.exn.map((exn) => {
                    return (
                        <View>
                            <Card>
                                <CardItem header onPress={() => this.props.callBackFromExScreen(this.props.id)}>
                                    <Text>{exn.name}</Text>
                                </CardItem>
                            </Card>
                        </View>
                    );
                }
                )
            )
        }*/
}