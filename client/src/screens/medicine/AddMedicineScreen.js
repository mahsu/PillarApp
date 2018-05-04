import React from 'react';
import {
    Body, Button, CheckBox, Col, Container, Content, Form, Icon, Input, Item, Label, ListItem, Row, Text,
    View
} from "native-base";
import AddFromPharmacyContainer from "../../containers/AddFromPharmacyContainer";
import PaddedContainer from "../../components/visual/PaddedContainer";
import {StyleSheet} from "react-native";
import PharmacyPicker from "../../components/PharmacyPicker";

let testMedication = {
    name: "Raltegravir 400mg",
    rxnum: "10125763-001",
    pill_b64: "",
    schedule: {
        num: "1", //number of pills
        every: "12" //hours
    },
    instructions: "Take 1 tablet by mouth every 12 hours"
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
                schedule: {
                    num: "",
                    every: ""
                },
                instructions: "Take 1 tablet by mouth every 6 hours"
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

    pharmacyPickedHandler = (pharmacy) => {
        console.log("pharmacy picked!");
        this.setState({
            formdata: {
                ...this.state.formdata,
                pharmacy
            }
        })
    };

    onScanCancelled = (cancelled) => {
        this.setState({
            screenState: AddMedicineScreen.stateEnum.ADD_CHOICE
        })
    };

    onPicture = (data) => {
        this.setState({
            formdata: {
                ...this.state.formdata,
                pill_b64: data
            }
        });
        console.log(data);
    };


    addMedicineHandler = () => {
        let formdata = this.state.formdata;
        formdata.schedule.num = parseInt(formdata.schedule.num);
        formdata.schedule.every = parseInt(formdata.schedule.num);

        if (typeof this.props.navigation.state.params.onMedicineAdd === 'function') {
            this.props.navigation.state.params.onMedicineAdd(formdata);
            this.props.navigation.goBack();
        } else {
            alert("onmedicineadd undefined");
        }
    };

    render() {
        if (this.state.screenState === AddMedicineScreen.stateEnum.ADD_CHOICE) {
            return (
                <Container style={{}}>
                    <Row style={{
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <Col style={{
                            justifyContent: 'center',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <Button
                                style={{
                                    width: 300,
                                    marginBottom: 10,
                                }}
                                onPress={() => {

                                    this.setState({screenState: AddMedicineScreen.stateEnum.SCAN_BARCODE})
                                }}>
                                <Icon name="ios-barcode-outline"/>
                                <Text>Scan Prescription Barcode</Text>
                            </Button>
                            <Button
                                style={{
                                    width: 300,
                                    marginTop: 10
                                }}
                                onPress={() => {
                                    this.setState({screenState: AddMedicineScreen.stateEnum.INPUT_INFO})
                                }}>
                                <Icon name="ios-add"/>
                                <Text>Manually Enter Prescription</Text>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.state.screenState === AddMedicineScreen.stateEnum.SCAN_BARCODE) {
            return (
                <PaddedContainer>
                    <Content>
                        <AddFromPharmacyContainer navigation={this.props.navigation} onRxData={this.onRxData}/>
                    </Content>
                </PaddedContainer>)
        } else {
            return (
                <PaddedContainer>
                    <Content>
                        {this.state.isPrepopulated
                            ? <Text style={styles.instructions}>Your prescription information was prepopulated from the
                                scanned barcode.
                                Please double check to make sure all the information is correct. If there are issues,
                                fix them and
                                immediately contact your pharmacy.</Text>
                            : <Text style={styles.instructions}>Please enter your prescription information exactly as
                                shown on the label.</Text>}
                        <Form>
                            <Row><Col>

                                <Item>
                                    <Label>Picture of Pill</Label>
                                    <Button light
                                            style={styles.iconButton}
                                            onPress={() => {
                                                this.props.navigation.navigate("TakePicture", {onPictureParsed: this.onPicture})
                                            }}><Icon name="ios-camera"/></Button>
                                </Item>


                                <Item floatingLabel>
                                    <Label>Name of Medication</Label>
                                    <Input
                                        value={this.state.formdata.name}
                                        onChange={(evt) => this.setState({
                                            formdata: {
                                                ...this.state.formdata,
                                                name: evt.nativeEvent.text
                                            }
                                        })}/>
                                </Item>
                                <Item floatingLabel>
                                    <Label>Rx #</Label>
                                    <Input
                                        value={this.state.formdata.rxnum}
                                        onChange={(evt) => this.setState({
                                            formdata: {
                                                ...this.state.formdata,
                                                rxnum: evt.nativeEvent.text
                                            }
                                        })}/>
                                </Item>

                                <Item fixedLabel>
                                    <Label style={{flex: 0}}>Pharmacy</Label>
                                    <PharmacyPicker onPharmacyPicked={this.pharmacyPickedHandler}/>
                                </Item>


                                <Item fixedLabel>
                                    <Input
                                        keyboardType="numeric"
                                        maxLength={1}
                                        placeholder="0"
                                        value={this.state.formdata.schedule.num}
                                        onChange={(evt) => this.setState({
                                        formdata: {
                                            ...this.state.formdata,
                                            schedule: {
                                                ...this.state.formdata.schedule,
                                                num: evt.nativeEvent.text
                                            }
                                        }
                                    })}
                                    />
                                    <Label style={{flex: 0}}>pill(s) every </Label>
                                    <Input
                                        keyboardType="numeric"
                                        maxLength={2}
                                        placeholder="24"
                                        value={this.state.formdata.schedule.every.toString()}
                                        onChange={(evt) => this.setState({
                                        formdata: {
                                            ...this.state.formdata,
                                            schedule: {
                                                ...this.state.formdata.schedule,
                                                every: evt.nativeEvent.text
                                            }
                                        }
                                    })}
                                    />
                                    <Label style={{flex: 0}}>hour(s)</Label>
                                </Item>

                                <ListItem style={styles.checkbox}>
                                    <CheckBox
                                        checked={this.state.isVerified}
                                        color='black'
                                        onPress={() => {
                                            this.setState({isVerified: !this.state.isVerified})
                                        }}/>
                                    <Body>
                                    <Text>All the information above is correct.</Text>
                                    </Body>
                                </ListItem>

                                <Button block primary
                                        style={styles.submit}
                                        onPress={() => {
                                            this.addMedicineHandler()
                                        }}
                                        disabled={!this.state.isVerified}>
                                    <Text>Submit</Text>
                                </Button>
                            </Col></Row>
                        </Form>
                    </Content>
                </PaddedContainer>
            )
        }
    }
}

const styles = StyleSheet.create({
    iconButton: {
        marginLeft: 10
    },
    instructions: {
        marginLeft: 15,
        marginTop: 2,
        marginBottom: 15,
    },
    checkbox: {
        marginTop: 20
    },
    submit: {
        marginTop: 30,
    }
});