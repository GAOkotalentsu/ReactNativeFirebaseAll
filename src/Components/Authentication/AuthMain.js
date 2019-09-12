import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { getUserInfoForApp, updateUserLocalStorage } from '../../Storage/User';
import { View, Dimensions, Text } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";



class AuthMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    //componentDidMount

    componentDidMount() {
        { !!this.props.user.user ? this.props.navigation.navigate('mainApp') : this.getuser() }
    }

    getuser() {
        that = this;
        getUserInfoForApp() //get user from storage
            .then(user => {
                console.log("from auth main loing user" + user);
                if (!!user) {
                    userObj = JSON.parse(JSON.stringify(user));
                    that.props.updateUser(userObj);
                    !!userObj.displayName ?
                        that.props.navigation.navigate('mainApp') :
                        that.props.navigation.navigate('login')
                }
                else if (!user) { //get user from firebase
                    console.log("inside user nul firebase");
                    const fuser = firebase.auth().currentUser;
                    console.log("inside then from firebbase");
                    if (!!fuser) {
                        userObj = JSON.parse(JSON.stringify(fuser));
                        that.props.updateUser(userObj);
                        updateUserLocalStorage(userObj);
                        console.log("got user:  " + JSON.stringify(fuser));
                        !!userObj.emailVerified ?
                            that.props.navigation.navigate('mainApp') :
                            that.props.navigation.navigate('login')
                    }
                    else {
                        console.log("in else of f user");
                        that.props.navigation.navigate('login');
                    }
                    console.log("out of f");
                }
            })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", marginVertical: "80%", alignItems: "center" }}>
                <AutoHeightImage
                    width={Dimensions.get("window").width * 0.7}
                    source={require("../../media/logo.png")}
                />
            </View>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthMain)