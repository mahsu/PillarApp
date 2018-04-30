import React from 'react';
import {Button, Container, Content, Text, View} from "native-base";

export default class MedicineScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    onAddPrescription = (e) => {
        this.props.navigation.navigate("MedicineAdd", {});
    };

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Button onPress={this.onAddPrescription}>
                            <Text>Add Prescription</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}