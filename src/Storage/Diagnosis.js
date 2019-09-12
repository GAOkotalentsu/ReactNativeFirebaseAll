import { AsyncStorage } from "react-native";


export async function updateDiagnosisResponse(response) {
    await AsyncStorage.setItem('DiagnosisResponse', JSON.stringify(response))
}


export async function getDiagnosisResponse() {
    try {
        console.log("inside GetUserInfoForApp()");
        const value = await AsyncStorage.getItem('DiagnosisResponse');
        console.log("inside part 2 GetUserInfoForApp()");
        if (!!value) {
            console.log("DiagnosisResponse:   " + value);
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


export async function deleteDiagnosisResponse() {
    try {
        const value = await AsyncStorage.removeItem('DiagnosisResponse');
        if (!!value) {
            return (JSON.parse(value));
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    }
}