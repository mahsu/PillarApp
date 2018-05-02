import React from 'react';
import {Button, Col, Container, Content, Form, Icon, Input, Item, Label, Row, Text, View} from "native-base";
import AddFromPharmacyContainer from "../Containers/AddFromPharmacyContainer";

var testMedication = {
    name: "Test Medication",
    rxnum: "1234567890",
    pill_b64: "",
    schedule: "",
    instructions: ""
}
export default class AddMedicineScreen extends React.Component {
    static stateEnum = Object.freeze({
        ADD_CHOICE: 1,
        SCAN_BARCODE: 2,
        INPUT_INFO: 3
    });

    static navigationOptions = ({navigation}) => ({
        header: (<View/>)
    });

    constructor(props) {
        super(props);
        this.state = {
            screenState: AddMedicineScreen.stateEnum.ADD_CHOICE,
            authenticated: false,
            formdata: {
                pharmacy: "",
                barcode: "",
            }
        }
    }

    onRxData = ({pharmacy, barcode}) => {
        this.setState({
            screenState: AddMedicineScreen.stateEnum.INPUT_INFO,
            formdata: {
                ...this.state.formdata,
                pharmacy,
                barcode,

            }
        })
    };

    addMedicineHandler = (response) => {
        if (typeof this.props.navigation.state.params.onMedicineAdd === 'function') {
            this.props.navigation.state.params.onMedicineAdd(response);
            this.props.navigation.goBack();
        } else {
            alert("onmedicineadd undefined");
        }
    };

    onPicture = (data) => {
        console.log(data);
    };



    addMedicine = async (formdata) => {
        await this.addMedicineHandler(true);
    };

    render() {
        if (this.state.screenState === AddMedicineScreen.stateEnum.ADD_CHOICE) {
            return (
                <View>
                <Button onPress={() => {this.setState({screenState: AddMedicineScreen.stateEnum.SCAN_BARCODE})}}>
                    <Icon name="ios-barcode-outline"/>
                    <Text>Scan Prescription Barcode</Text>
                </Button>
                <Button onPress={() => {this.setState({screenState: AddMedicineScreen.stateEnum.INPUT_INFO})}}>
                    <Icon name="ios-plus"/>
                    <Text>Manually Enter Prescription</Text>
                </Button>
                </View>
            )
        } else if (this.state.screenState === AddMedicineScreen.stateEnum.SCAN_BARCODE) {
            return (<AddFromPharmacyContainer onRxData={this.onRxData}/>)
        } else {
            return (
                <Container>
                    <Content>
                        <Form>
                            <Row><Col>

                                <Item>
                                    <Label>Picture of Pill</Label>
                                    <Button light onPress={() => {
                                        this.props.navigation.navigate("TakePicture", {onPictureParsed: this.onPicture})
                                    }}><Icon name="ios-camera"/></Button>
                                </Item>


                                <Item fixedLabel>
                                    <Label>Name of Medication</Label>
                                    <Input value="812383431"/>
                                </Item>
                                <Item fixedLabel>
                                    <Label>Rx #</Label>
                                    <Input value=""/>
                                </Item>
                                <Item fixedLabel>
                                    <Label>Pharmacy</Label>
                                    <Input value=""/>
                                </Item>

                                <Item fixedLabel>
                                    <Label>Daily Frequency</Label>
                                    <Input value="1/2/3"/>
                                </Item>


                                <Button block primary onPress={() => {
                                    this.addMedicineHandler()
                                }}>
                                    <Text>Submit</Text>
                                </Button>
                            </Col></Row>
                        </Form>
                    </Content>
                </Container>
            )
        }
    }
}