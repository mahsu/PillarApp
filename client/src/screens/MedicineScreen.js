import React from 'react';
import {Button, Container, Content, Text, View} from "native-base";

export default class MedicineScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const navstate = this.props.navigation.state.params;
        return (
            <Container>
                <Content>
                    <View>
                        <Button onPress={() => {this.props.navigation.navigate("MedicineAdd", navstate)}}>
                            <Text>Add Prescription</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}