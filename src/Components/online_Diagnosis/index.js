/*
This file has all the links to components used for online disgnosis
*/

import React, { Component } from "react";
import { Content, Button, Text, Container, Input, Item, Label, Spinner } from "native-base";


export default class DiagnosisScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Button block style={{ margin: 10 }} onPress={() => this.props.passCallBackFromCustomContainer('ncdScreen')}>
                        <Text>Non-Communicable Diseases General</Text>
                    </Button>
                    <Button block style={{ margin: 10 }} onPress={() => this.props.passCallBackFromCustomContainer('earlyDetectionScreen')}>
                        <Text>Early Detection</Text>
                    </Button>
                    <Button block style={{ margin: 10 }} onPress={() => this.props.passCallBackFromCustomContainer('workoutPlayer')}>
                        <Text>Workout Player</Text>
                    </Button>
                    <Button block style={{ margin: 10 }} onPress={() => this.props.passCallBackFromCustomContainer('testMain')}>
                        <Text>Start Test</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}