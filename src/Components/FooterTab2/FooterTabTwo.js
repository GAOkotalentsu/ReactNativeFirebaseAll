import React, { Component } from "react";
import { Content, Button, Text, Container, Input, Form, Item, Label, Spinner } from "native-base";
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import Sound from 'react-native-sound';
import { getUserInfoForApp, updateUserLocalStorage, _clearUserAppData } from '../../Storage/User';


class FooterTabTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            index: 0,
            arr: ['comming_up.mp3', 'pushups.mp3']
        };
    }

    playOne() {
        whoosh = new Sound('prepare_for.mp3', '', (error) => {
            //whoosh = new Sound('get_ready_for_the_next_exercise.mp3', Sound.MAIN_BUNDLE, (error) => {

            if (error) {
                console.log('failed to load the sound', error.toString());
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }



    playTwo() {
        if (this.state.play) {
            console.log("loop start");
            whoosh = new Sound(this.state.arr[this.state.index], Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
                soundLength = whoosh.getDuration();
                // Play the sound with an onEnd callback
                whoosh.play((success) => {
                    if (success) {
                        if (this.state.arr.length <= (this.state.index + 1))
                            this.setState({ play: false });
                        else
                            this.setState({ index: (this.state.index + 1) })
                    } else {
                        this.setState({ index: this.state.index + 1 });
                    }
                });
            });
        }
        else
            null
    }



    loogout() {
        that = this;
        console.log("inside logout");
        userobj1 = firebase.auth().currentUser.
            userobj = firebase.auth().signOut()
                .then(user => {
                    console.log("doing delete 1:  " + user);
                    console.log("doing delete 2:  " + toString(user));
                    console.log("doing delete 3:  " + JSON.stringify(user));
                    _clearUserAppData();
                    that.props.passCallBackFromCustomContainer('login');
                })
    }

    getUser() {
        console.log("inside to get user");
        a = getUserInfoForApp()
            .then(aa => {
                console.log("got user:  " + aa)
                console.log("got user:  " + aa.emailVerified)
            })
    }

    render() {
        return (
            <Container>
                {this.playTwo()}
                <Content>
                    <Text>"token got" "no token"</Text>
                    <Text>{this.state.index}</Text>
                    <Text>{this.state.play.toString()}</Text>

                    <Text>{this.props.user ? "this.props.user" : "no"}</Text>
                    {console.log(this.props.user)}
                    {console.log(this.props.user.displayName)}
                    <Button block style={{ margin: 10 }} onPress={() => this.loogout()}>
                        <Text>Sign Out</Text>
                    </Button>

                    <Button block style={{ margin: 10 }} onPress={() => this.playOne()}>
                        <Text>one song</Text>
                    </Button>

                    <Button block style={{ margin: 10 }} onPress={() => this.setState({ play: true })}>
                        <Text>two song</Text>
                    </Button>

                    <Button block style={{ margin: 10 }} onPress={() => this.getUser()}>
                        <Text>get user</Text>
                    </Button>

                    <Button block style={{ margin: 10 }} onPress={() => _clearUserAppData()}>
                        <Text>get user</Text>
                    </Button>
                </Content>
            </Container >
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps, null)(FooterTabTwo)