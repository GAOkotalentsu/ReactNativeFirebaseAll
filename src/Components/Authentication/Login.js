import React, { Component } from "react";
import { StatusBar, Alert } from "react-native";
import { Content, Button, Text, Container, Input, Form, Item, Label, Spinner } from "native-base";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { updateUserLocalStorage } from "../../Storage/User";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            response: "",
            loading: false
        };
        this.login = this.login.bind(this);
    }


    verifyEmail() {
        console.log("inside email verify");
        firebase.auth().currentUser.sendEmailVerification();
        Alert.alert(
            'Email Verification',
            'Your email is not verified. \nWe have send you an email to email id ' + this.state.email + ' please click on the link mentioned in email and then press done here.',
            [
                { text: 'Done!', onPress: () => this.loginAction() },
            ],
            { cancelable: false }
        )
    }


    async loginAction() {
        try {
            const onLoginDetails = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            userObj = JSON.parse(JSON.stringify(onLoginDetails.user));

            this.props.updateUser(userObj);
            updateUserLocalStorage(userObj);

            if (!userObj.emailVerified) {
                this.verifyEmail();
            }
            else if (!!userObj) {
                const token = await firebase.auth().currentUser.getIdToken();
                this.props.updateToken(token);
                this.props.navigation.navigate('mainApp');
                /*tempPro = {
                    displayName: "AbhisehDisplay name", photoUrl: "http-no url til date"
                }
                const updatedProfile = await onLoginDetails.user.updateProfile(tempPro);
                console.log(updatedProfile);*/
            }
        } catch (error) {
            this.setState({
                response: error.toString()
            })
            console.log(this.state.response)
            this.loginErrorHandling()
        }
    }


    alertPopUp(heading, body) {
        Alert.alert(
            heading ? heading : 'Alert',
            body,
            [],
            { cancelable: true }
        )
    }


    login() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        const { email, password } = this.state;
        if (!email && !password)
            this.alertPopUp(null, 'Please enter Username and Password');

        else if (!email)
            this.alertPopUp(null, 'Please enter your Username');

        else if (!password)
            this.alertPopUp(null, 'Please enter your Password');
        
        else if(!reg.test(email)){
            this.alertPopUp(null, 'Please enter valid Email ID');
        }

        else {
            this.setState({ loading: true });
            this.loginAction()
        }
    }


    loginButton() {
        if (!this.state.loading) {
            return (
                <Button block primary onPress={() => this.login()}>
                    <Text>Login</Text>
                </Button>
            )
        }
        else {
            return (
                <Spinner color='blue' />
            )
        }
    }

    loginErrorHandling() {
        const { response } = this.state;
        switch(response){
            case "Error: There is no user record corresponding to this identifier. The user may have been deleted.":
                    this.alertPopUp(null, 'No records found. Please sign up');
                    this.setState({ loading: false });
                    break;
            case "Error: The password is invalid or the user does not have a password.":
                    this.alertPopUp(null, 'Wrong Password');
                    this.setState({ loading: false });
                    break;
            default:
                    this.alertPopUp(null, 'Error Occured');
                    this.setState({ loading: false });
        }
    }


    render() {
        return (
            <Container>
                <Content>
                    <StatusBar barStyle="light-content" />
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input textContentType="emailAddress" keyboardType="email-address" onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} textContentType="password" onChangeText={(password) => this.setState({ password })} />
                        </Item>

                        <Text>{"\n\n"}</Text>
                    </Form>

                    {this.loginButton()}

                    <Button block primary onPress={() => { this.props.navigation.navigate('signUp') }}><Text>Create New Account</Text>
                </Button>
                
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token,
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateToken: (token) => dispatch({ type: 'UPDATE_TOKEN', payload: token }),
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)