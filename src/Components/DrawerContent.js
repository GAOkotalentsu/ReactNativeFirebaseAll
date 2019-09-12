import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import {
  Container,
  Content,
  Icon,
  Fab,
  Text,
  Button
} from "native-base";

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (

      <Container>
        <Content style={{ backgroundColor: "teal" }}>
          <Text>Some Text</Text>
          <View height={Dimensions.get("window").height / 3}>
            <Button rounded disabled>
              <Text>User</Text>
            </Button>
            <Button rounded disabled>
              <Text>Email</Text>
            </Button>
          </View>
          <ScrollView>
            <Button full info>
              <Text>Option</Text>
            </Button>
            <Button full info>
              <Text>Option</Text>
            </Button>
            <Button full info>
              <Text>Option</Text>
            </Button>
            <Button full info>
              <Text>Option</Text>
            </Button>
            <Button full info>
              <Text>Option</Text>
            </Button>
          </ScrollView>
          <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="call" />
            <Button style={{ backgroundColor: "#34A34F" }}>
              <Icon name="medkit" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="body" />
            </Button>
          </Fab>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    height: 250
  },
  img: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FF4800",
    height: 100,
    margin: 50,
    justifyContent: "center"
  },

  btn: {}
});
