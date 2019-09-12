import { AsyncStorage } from "react-native";


export async function updateUserLocalStorage(user) {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log("user saving done: email verified: " + user.emailVerified);
        return true;
    } catch (error) {
        console.log("user saving done");
        return false;
    }
}


export async function getUserInfoForApp() {
    try {
        console.log("inside GetUserInfoForApp()");
        const value = await AsyncStorage.getItem('user');
        console.log("inside part 2 GetUserInfoForApp()");
        if (!!value) {
            console.log("getUserInfoForApp: " + value);
            return (JSON.parse(value));
        }
        else {
            console.log("inside else of GetUserInfoForApp()");
            return false;
        }
    } catch (error) {
        console.log("inside catch error of GetUserInfoForApp()");
        return false;
    }
}


export async function _clearUserAppData() {
    try {
        await AsyncStorage.removeItem('user');
        console.log("valuee");
        return true;
    } catch (error) {
        console.log("user Delete from storage error");
        return false;
    }
}