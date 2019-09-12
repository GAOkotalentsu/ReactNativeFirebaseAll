import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";

import firebase from 'react-native-firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            response: "",
            user: null,
            res: null,
        };
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async signup() {
        try {
            const userr = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((ress) => {
                    this.setState({
                        res: ress
                    });
                })
            this.setState({
                response: "account created",
                user: userr
            });
        } catch (error) {
            this.setState({
                response: error.toString(),
                user: null
            })
        }
    }

    async login() {
        try {
            const userrr = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            this.setState({
                response: "Logged In!",
            });
        } catch (error) {
            this.setState({
                response: error.toString(),
                user: null
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>here we go</Text>
                <Text>res: {this.state.res}</Text>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.container}>

                    <View >
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={require("../media/logo.png")}
                            />
                            <Text style={styles.title}>Account Information</Text>
                        </View>

                        <TextInput
                            style={styles.inputBox}
                            placeholder="Email Address"
                            placeholderTextColor="#ffffff"
                            keyboardType="email-address"
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.password.focus()}
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Password"
                            placeholderTextColor="rgba(255,255,255,1.0)"
                            returnKeyType="go"
                            secureTextEntry={true}
                            autoCorrect={false}
                            ref={input => (this.password = input)}
                            onChangeText={(password) => this.setState({ password })}
                        />

                        <TouchableOpacity onPress={() => this.login()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.signup()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Text>response: {this.state.response}</Text>
                <Text>user: {this.state.user}</Text>
            </SafeAreaView>
        );
    }

    onLogin = {
        "additionalUserInfo": {
            "isNewUser": false
        },
        "user": {
            "metadata": {
                "lastSignInTime": 1548532851000, "creationTime": 1547117411000
            },
            "providerData": [{
                "email": "abhisri2090@gmail.com", "photoURL": null, "phoneNumber": null, "displayName": "AbhisehDisplay name", "uid": "abhisri2090@gmail.com", "providerId": "password"
            }],
            "photoURL": null,
            "phoneNumber": null,
            "displayName": "AbhisehDisplay name",
            "email": "abhisri2090@gmail.com",
            "isAnonymous": false,
            "emailVerified": true,
            "providerId": "firebase",
            "uid": "f1s9Tg8nrgeENfD0oDgEoBR8YZ52"
        }
    }




    onCurrentUser = {
        "metadata": {
            "lastSignInTime": 1548453060000, "creationTime": 1547117411000
        },
        "providerData": [{
            "email": "abhisri2090@gmail.com", "photoURL": null, "phoneNumber": null, "displayName": "AbhisehDisplay name", "uid": "abhisri2090@gmail.com", "providerId": "password"
        }],
        "photoURL": null,
        "phoneNumber": null,
        "displayName": "AbhisehDisplay name",
        "email": "abhisri2090@gmail.com",
        "isAnonymous": false,
        "emailVerified": true,
        "providerId": "firebase",
        "uid": "f1s9Tg8nrgeENfD0oDgEoBR8YZ52"
    }




}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#455a64",
        flex: 1
    },
    logoContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    logo: {
        marginTop: 120,
        width: 256,
        height: 200
    },
    title: {
        color: "#f7c744",
        fontSize: 10,
        textAlign: "center",
        marginTop: 10,
        opacity: 0.9
    },
    infoContainer: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        marginBottom: 0,
        padding: 20
        // backgroundColor: 'red'
    },
    inputBox: {
        height: 40,
        backgroundColor: "rgba(0, 0,255,0.5)",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#ffffff",
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        width: 350,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
        textAlign: "center"
    }
});


module.exports = Login;