import React from "react";
import { View } from 'react-native';
import { Content, Header, Button, Text, Col, Grid, Container, Card, CardItem, Body } from "native-base";

export default class CardDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isVisible: false, exn: [] }
    }

    /*componentDidMount() {
        this.setState({ exn: this.props.exx })
    }*/

    toggleVisiblity = () => this.setState({ isVisible: !this.state.isVisible })

    render() {
        return (
            <View>
                <Card>
                    <CardItem header button onPress={() => this.props.callBackFromExScreen(this.props.id)}>
                        <Text>{this.props.exName}</Text>
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
                                <CardItem header>
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