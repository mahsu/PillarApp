import React from 'react';
import {
    Body, Button, CheckBox, Col, Container, Content, Form, Icon, Input, Item, Label, Row, Text,
    View
} from "native-base";
import AddFromPharmacyContainer from "../containers/AddFromPharmacyContainer";

let testMedication = {
    name: "Test Medication",
    rxnum: "1234567890",
    pill_b64: "",
    schedule: "",
    instructions: ""
};

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
                name: "",
                pharmacy: "",
                barcode: "",
                schedule: "",
                instructions: ""
            },
            isPrepopulated: false,
            isVerified: false
        }
    }

    onRxData = ({pharmacy, barcode}) => {
        this.setState({
            screenState: AddMedicineScreen.stateEnum.INPUT_INFO,
            formdata: {
                ...this.state.formdata,
                pharmacy,
                barcode,
            },
            isPrepopulated: true
        });

        // mock a request to the relevant pharmacy api for medication data
        result = testMedication;
        this.setState({
            formdata: {
                ...this.state.formdata,
                ...result
            },
        });
    };

    addMedicineHandler = (response) => {
        if (typeof this.props.navigation.state.params.onMedicineAdd === 'function') {
            this.props.navigation.state.params.onMedicineAdd(response);
            this.props.navigation.goBack();
        } else {
            alert("onmedicineadd undefined");
        }
    };

    onScanCancelled = (cancelled) => {
        this.setState({
            screenState: AddMedicineScreen.stateEnum.ADD_CHOICE
        })
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
                    <Button onPress={() => {
                        this.setState({screenState: AddMedicineScreen.stateEnum.SCAN_BARCODE})
                    }}>
                        <Icon name="ios-barcode-outline"/>
                        <Text>Scan Prescription Barcode</Text>
                    </Button>
                    <Button onPress={() => {
                        this.setState({screenState: AddMedicineScreen.stateEnum.INPUT_INFO})
                    }}>
                        <Icon name="ios-add"/>
                        <Text>Manually Enter Prescription</Text>
                    </Button>
                </View>
            )
        } else if (this.state.screenState === AddMedicineScreen.stateEnum.SCAN_BARCODE) {
            return (<AddFromPharmacyContainer navigation={this.props.navigation} onRxData={this.onRxData}/>)
        } else {
            return (
                <Container>
                    <Content>
                        {this.state.isPrepopulated ?
                            <Text>Your prescription information was prepopulated from the scanned barcode.
                                Please double check to make sure all the information is correct. If there are issues,
                                fix them and
                                immediately contact your pharmacy.</Text> : <View/>}
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
                                    <Input
                                        value={this.state.formdata.name}
                                        onChange={(val) => this.setState({
                                            formdata: {
                                                ...this.state.formdata,
                                                name: val
                                            }
                                        })}/>
                                </Item>
                                <Item fixedLabel>
                                    <Label>Rx #</Label>
                                    <Input
                                        value={this.state.rxnum}
                                        onChange={(val) => this.setState({
                                            formdata: {
                                                ...this.state.formdata,
                                                rxnum: val
                                            }
                                        })}/>
                                </Item>
                                <Item fixedLabel>
                                    <Label>Pharmacy</Label>
                                    <Input
                                        value={this.state.pharmacy}
                                        onChange={(val) => this.setState({
                                            formdata: {
                                                ...this.state.formdata,
                                                pharmacy: val
                                            }
                                        })}/>
                                </Item>

                                <Item fixedLabel>
                                    <Label>Daily Frequency</Label>
                                    <Input value="1/2/3"/>
                                </Item>

                                <Item>
                                    <CheckBox
                                        checked={false}
                                        onPress={() => {
                                            this.setState({isVerified: !this.state.isVerified})
                                        }}/>
                                    <Body>
                                    <Text>I have verified that the information above is correct.</Text>
                                    </Body>
                                </Item>

                                <Button block primary
                                        onPress={() => {
                                            this.addMedicineHandler()
                                        }}
                                        disabled={this.state.isVerified}>
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