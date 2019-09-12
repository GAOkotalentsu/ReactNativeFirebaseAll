import React from 'react';
import { View, Text, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Icon } from "native-base";
import ModalDisplay from "./ModalDisplay";
import { updateDiagnosisResponse, getDiagnosisResponse, deleteDiagnosisResponse } from "../../Storage/Diagnosis";
import BreastCancerScreen from './BreastCancerScreen';
import NcdScreen from './NcdScreen';
import EarlyDetectionScreen from './EarlyDetectionScreen';
import HyperTension from './HyperTension';
import Diabetes from './Diabetes';
import { saveUserDiagnosisResponse } from '../../Util/Links';
import dempApiMale from './demoApiMale';



export default class TestMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: null,
            saveData: false,
            showAlert: false,
            name: null,
            currentDiagnosisComponent: 1,
            maxDiagnosisComponent: 5,
            modalVisible: true,
            ncdResponse: [],
            ncdCompleted: false,
            EDResponse: [],
            EDCompleted: false,
            breastCancerResponse: [],
            breastCancerCompleted: false,
            diabetesResponse: [],
            diabetesCompleted: false,
            hyperTensionResponse: null,
            hyperTensionCompleted: null,
            isUploading: false,
        }
    }

    componentWillMount() {
        getDiagnosisResponse()
            .then(res => {
                if (!!res) {
                    response = JSON.parse(JSON.stringify(res));
                    this.setState({ ...response })
                }
                else if (!user) { //get user from firebase
                    console.log("no User report");
                }
            })
    }


    componentDidMount() {
        StatusBar.setBackgroundColor('#d6d6d6', true);
    }

    componentWillUnmount() {
        this.save();
        StatusBar.setBackgroundColor('#1045a8', true);
        Alert.alert(
            '',
            "Your response has been saved.",
            [],
            { cancelable: true }
        )
    }

    callBackFromModal(cGender, cName) {
        this.setState({ name: cName, gender: cGender, modalVisible: false });
    }

    renderModal() {
        if (!this.state.gender && !this.state.name) {
            return (
                <View>
                    <ModalDisplay visible={this.state.modalVisible} callBackFromNcdScreen={this.callBackFromModal.bind(this)} type={"info"} />
                </View>
            )
        }
        else {
            if (this.state.modalVisible) {
                return (
                    <View>
                        <ModalDisplay visible={this.state.modalVisible} callBackFromNcdScreen={this.callBackFromModal.bind(this)} type={"info"} />
                    </View>
                )
            }
            return null
        }
    }

    renderDignosisComponent() {
        if (this.state.gender === "male") {
            switch (this.state.currentDiagnosisComponent) {
                case 1:
                    return <NcdScreen response={this.state.ncdResponse ? this.state.ncdResponse : null} gender={this.state.gender} navigationPanelType={"first"} submit={this.callBackSubmit.bind(this)} />
                case 2:
                    return <EarlyDetectionScreen response={this.state.EDResponse ? this.state.EDResponse : null} gender={this.state.gender} navigationPanelType={"mid"} submit={this.callBackSubmit.bind(this)} />
                case 3:
                    return <HyperTension response={this.state.hyperTensionResponse ? this.state.hyperTensionResponse : null} isCompleted={this.state.hyperTensionCompleted} gender={this.state.gender} navigationPanelType={"mid"} submit={this.callBackSubmit.bind(this)} />
                case 4:
                    return <Diabetes response={this.state.diabetesResponse ? this.state.diabetesResponse : null} isCompleted={this.state.diabetesCompleted} gender={this.state.gender} navigationPanelType={"last"} submit={this.callBackSubmit.bind(this)} />
                case 5:
                    return this.thankYouPage();
                default:
                    return
            }
        }
        else {
            switch (this.state.currentDiagnosisComponent) {
                case 1:
                    return <NcdScreen response={this.state.ncdResponse ? this.state.ncdResponse : null} gender={this.state.gender} navigationPanelType={"first"} submit={this.callBackSubmit.bind(this)} />
                case 2:
                    return <EarlyDetectionScreen response={this.state.EDResponse ? this.state.EDResponse : null} gender={this.state.gender} navigationPanelType={"mid"} submit={this.callBackSubmit.bind(this)} />
                case 3:
                    return <BreastCancerScreen response={this.state.breastCancerResponse ? this.state.breastCancerResponse : null} gender={this.state.gender} navigationPanelType={"mid"} submit={this.callBackSubmit.bind(this)} />
                case 4:
                    return <HyperTension response={this.state.hyperTensionResponse ? this.state.hyperTensionResponse : null} isCompleted={this.state.hyperTensionCompleted} gender={this.state.gender} navigationPanelType={"mid"} submit={this.callBackSubmit.bind(this)} />
                case 5:
                    return <Diabetes response={this.state.diabetesResponse ? this.state.diabetesResponse : null} isCompleted={this.state.diabetesCompleted} gender={this.state.gender} navigationPanelType={"last"} submit={this.callBackSubmit.bind(this)} />
                case 6:
                    return this.thankYouPage();
                default:
                    return
            }
        }
    }

    callBackSubmit(screen, response, isCompleted, saveOnly = false, goBack = false) {
        switch (screen) {
            case "ncd":
                if (!goBack)
                    this.setState({ ncdResponse: response, ncdCompleted: isCompleted, currentDiagnosisComponent: saveOnly ? this.state.currentDiagnosisComponent : this.state.currentDiagnosisComponent + 1, saveData: saveOnly })
                else
                    this.setState({ ncdResponse: response, ncdCompleted: isCompleted, currentDiagnosisComponent: this.state.currentDiagnosisComponent - 1, saveData: saveOnly })
                break;
            case "EarlyDetection":
                if (!goBack)
                    this.setState({ EDResponse: response, EDCompleted: isCompleted, currentDiagnosisComponent: saveOnly ? this.state.currentDiagnosisComponent : this.state.currentDiagnosisComponent + 1, saveData: saveOnly })
                else
                    this.setState({ EDResponse: response, EDCompleted: isCompleted, currentDiagnosisComponent: this.state.currentDiagnosisComponent - 1, saveData: saveOnly })
                break;
            case "BreastCancer":
                if (!goBack)
                    this.setState({ breastCancerResponse: response, breastCancerCompleted: isCompleted, currentDiagnosisComponent: saveOnly ? this.state.currentDiagnosisComponent : this.state.currentDiagnosisComponent + 1, saveData: saveOnly })
                else
                    this.setState({ breastCancerResponse: response, breastCancerCompleted: isCompleted, currentDiagnosisComponent: this.state.currentDiagnosisComponent - 1, saveData: saveOnly })
                break;
            case "HyperTension":
                if (!goBack)
                    this.setState({ hyperTensionResponse: response, hyperTensionCompleted: isCompleted, currentDiagnosisComponent: saveOnly ? this.state.currentDiagnosisComponent : this.state.currentDiagnosisComponent + 1, saveData: saveOnly })
                else
                    this.setState({ hyperTensionResponse: response, hyperTensionCompleted: isCompleted, currentDiagnosisComponent: this.state.currentDiagnosisComponent - 1, saveData: saveOnly })
                break;
            case "Diabetes":
                if (!goBack)
                    this.setState({ diabetesResponse: response, diabetesCompleted: isCompleted, currentDiagnosisComponent: saveOnly ? this.state.currentDiagnosisComponent : this.state.currentDiagnosisComponent + 1, saveData: saveOnly })
                else
                    this.setState({ diabetesResponse: response, diabetesCompleted: isCompleted, currentDiagnosisComponent: this.state.currentDiagnosisComponent - 1, saveData: saveOnly })
                break;
        }
    }


    save() {
        let DiagnosisResponse = {
            ncdResponse: this.state.ncdResponse,
            ncdCompleted: this.state.ncdCompleted,
            EDResponse: this.state.EDResponse,
            EDCompleted: this.state.EDCompleted,
            breastCancerResponse: this.state.breastCancerResponse,
            breastCancerCompleted: this.state.breastCancerCompleted,
            hyperTensionResponse: this.state.hyperTensionResponse,
            hyperTensionCompleted: this.state.hyperTensionCompleted,
            diabetesResponse: this.state.diabetesResponse,
            diabetesCompleted: this.state.diabetesCompleted,
        }
        updateDiagnosisResponse(DiagnosisResponse);
    }


    callBackSave() {
        if (this.state.saveData) {
            this.save()
            Alert.alert(
                '',
                "Your response has been saved.",
                [],
                { cancelable: true }
            )
            this.setState({ saveData: false });
        }
    }


    getStorageData() {
        getDiagnosisResponse() //get user from storage
            .then(user => {
                if (!!user) {
                    userObj = JSON.parse(JSON.stringify(user));
                }
                else if (!user) { //get user from firebase

                }
            })
    }


    dataFormater_POST() {
        finalResponse = dempApiMale();


        let res = this.state.ncdResponse;
        for (let i = 0; i < res.length; i = i + 2) {
            finalResponse.ncd[res[i]] = res[i + 1].toString();
        }
        console.log(finalResponse);


        res = this.state.EDResponse
        for (let i = 0; i < res.length; i = i + 2) {
            finalResponse.earlyDetaction[res[i]] = res[i + 1].toString();
        }
        console.log(finalResponse);


        if (this.state.gender === "female") {
            let res = this.state.breastCancerResponse
            for (let i = 0; i < res.length; i = i + 2) {
                finalResponse.BreastCancer[res[i]] = res[i + 1].toString();
            }
        }
        else {
            finalResponse.BreastCancer = "0"
        }
        console.log(finalResponse);


        res = this.state.hyperTensionResponse
        if (!!res) {
            finalResponse.hyperTension[1] = '1';
            finalResponse.hyperTension[2] = res;
        }
        else {
            finalResponse.hyperTension[1] = '2';
            finalResponse.hyperTension[2] = 0;
        }
        console.log(finalResponse);


        res = this.state.diabetesResponse
        if (!!res) {
            finalResponse.diabeties[1] = '1';
            finalResponse.diabeties[2] = res[0].toString();
            finalResponse.diabeties[3] = res[1].toString();
            finalResponse.diabeties[4] = res[2].toString();
        }
        console.log(finalResponse);
        return finalResponse
    }


    saveToCloud() {
        fetch(saveUserDiagnosisResponse, {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": 'abhishe',
                "gender": 'male',
                "response": JSON.stringify(this.dataFormater_POST())
            }),
        })
            .then(res => res.json())
            .then(res => {
                Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [
                        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
                console.log(res)
            })
            .catch(err => console.log(err))
        this.setState({ isUploading: true })
    }


    thankYouPage() {
        if (this.state.EDCompleted && (this.state.gender === "male" ? true : this.state.breastCancerCompleted) && this.state.hyperTensionCompleted && this.state.ncdCompleted && this.state.diabetesCompleted) {
            // console.log("inside POST of ....")

            return (
                <ModalDisplay type={"submit"} submitCallBack={this.saveToCloud.bind(this)} isUploading={this.state.isUploading} />
                // <Container>
                //     <ActivityIndicator size="large" color="#0000ff" />
                //     <Text>{"\n\n\nThank you for folowing with us.\n\nWe will contact you soon as with your diagnosis report.\n\nThank-you"}</Text>
                // </Container>
            )
        }
        else {
            return (
                <Container>
                    <Text>{"\n\n\nYour response has been saved.\nPlease give response to all the questions to submit it.\n Thankyou"}</Text>
                </Container>
            )
        }

    }


    deleteSavedDiagnosisResponse() {
        deleteDiagnosisResponse();
        this.setState({
            ncdResponse: [],
            ncdCompleted: false,
            EDResponse: [],
            EDCompleted: false,
            breastCancerResponse: [],
            breastCancerCompleted: false,
            diabetesResponse: [],
            diabetesCompleted: false,
            hyperTensionResponse: null,
            hyperTensionCompleted: null
        })
    }

    render() {
        this.callBackSave()
        return (
            <Container>
                <Content>
                    <Text onPress={() => this.deleteSavedDiagnosisResponse()}>Delete All stored Response</Text>
                    {this.renderModal()}
                    {this.renderDignosisComponent()}
                </Content>
            </Container>
        );
    }
}