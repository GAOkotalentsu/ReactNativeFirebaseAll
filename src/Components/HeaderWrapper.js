import React from "react";
import { Header, Icon, Body, Title, Left, Button } from "native-base";

export default function HeaderWrapper(props) {
    return (
        <Header>
            <Left>
                <Button onPress={() => { props.drawerprop() }} >
                    <Icon type={props.iconType ? props.iconType : "AntDesign"} name={props.iconName ? props.iconName : "menu-fold"} />
                </Button>
            </Left>
            <Body>
                <Title>{props.headerName ? props.headerName : 'menu'} </Title>
            </Body>
        </Header>
    );
}