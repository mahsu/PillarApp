import React from 'react';
import {Button, Col, Container, Content, Form, Icon, Input, Item, Label, Row, Text, View} from "native-base";

export default class AddMedicineScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: (<View/>)
    });

    constructor(props) {
        super(props);
    }

    addMedicineHandler = (response) => {
        if (typeof this.props.navigation.state.params.onMedicineAdd === 'function') {
            this.props.navigation.state.params.onMedicineAdd(response);
            this.props.navigation.goBack();
        } else {
            alert("onmedicineadd undefined");
        }
    };

    addMedicine = async (formdata) => {
        this.addMedicineHandler(true);
    };

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Row><Col>
                            <Item>
                                <Label>Picture of Pill</Label>
                                <Button light onPress={() => {this.props.navigation.navigate("TakePicture")}}><Icon name="ios-camera"/></Button>
                            </Item>

                            <Item fixedLabel>
                                <Label>Name of Medication</Label>
                                <Input value="812383431" />
                            </Item>

                            <Item fixedLabel>
                                <Label>Frequency</Label>
                                <Input value="1/2/3" />
                            </Item>


                            <Button block primary onPress={() => {this.addMedicine()}} >
                                <Text>Submit</Text>
                            </Button>
                        </Col></Row>
                    </Form>
                </Content>
            </Container>
        )
    }
}