import React from "react";
import { View } from 'react-native';
import Routes from '../Routes';
import FitnessScreen from './Fitness/';
import DiagnosisScreen from './online_Diagnosis/';
import FooterTabTwo from './FooterTab2/FooterTabTwo';


export default class CustomContainer extends React.Component {

    renderScreen(number) {
        switch (number) {
            case 1:
                return <DiagnosisScreen passCallBackFromCustomContainer={this.callBackFromFooterTabs.bind(this)} />
            case 2:
                return <FooterTabTwo passCallBackFromCustomContainer={this.callBackFromFooterTabs.bind(this)} />
            case 3:
                return <FitnessScreen passCallBackFromCustomContainer={this.callBackFromFooterTabs.bind(this)} />
            default:
                return <FitnessScreen passCallBackFromCustomContainer={this.callBackFromFooterTabs.bind(this)} />
        }
    }

    callBackFromFooterTabs(navigateTO) {
        this.props.callBackFromCustomContainer(navigateTO)
    }


    render() {
        return this.renderScreen(this.props.tab)
    }
}
