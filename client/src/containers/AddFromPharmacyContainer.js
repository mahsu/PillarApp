import React from 'react'
import {Button, Col, Form, Icon, Input, Item, Label, Picker, Row, Text, View} from "native-base";


export default class AddFromPharmacyContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            barcode: "",
            pharmacy: ""
        }
    }

    onBarCode = ({bounds, type, data, target}) => {
        console.log(data);
        this.setState({barcode: data});
    };

    componentDidMount() {
        this.props.navigation.navigate("BarCodeScanner", {onBarCodeParsed: this.onBarCode})
    }

    confirmRxData = (e) => {
        let data = {
            barcode: this.state.rxnum,
            pharmacy: this.state.pharmacy
        };

        if (typeof this.props.onRxData === 'function') {
            this.props.onRxData(data);
            this.props.onRxData = null; //prevent duplicate calls
        } else {
            console.log("onRxData undefined");
        }
    };

    render() {
        if (this.state.barcode != "") {
            return (
                <Form>
                    <Row><Col>

                        <Item>
                            <Label>Picture of Pill</Label>
                            <Button light onPress={
                                this.props.navigation.navigate("TakePicture", {onPictureParsed: this.onPicture})
                            }><Icon name="ios-camera"/></Button>
                        </Item>

                        <Item fixedLabel>
                            <Label>Barcode</Label>
                            <Input value={this.state.barcode}
                                   onChangeText={(text) => this.setState({barcode: text})}/>
                        </Item>

                        <Item fixedLabel>
                            <Label>Pharmacy</Label>
                            <Picker
                                iosHeader="Select Your Pharmacy"
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                placeholder="Select Your Pharmacy"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: undefined }}
                                selectedValue={this.state.pharmacy}
                                onValueChange={(str) => {this.setState({pharmacy: str})}}
                            >
                                <Picker.Item label="Empire State Pharmacy" value="Empire State Pharmacy" />
                                <Picker.Item label="Garden State Pharmacy" value="Garden State Pharmacy" />
                                <Picker.Item label="Sunshine State Pharmacy" value="Sunshine State Pharmacy" />
                            </Picker>
                        </Item>
                        <Item>
                            <Button block primary onPress={this.confirmRxData}>
                                <Text>Confirm</Text>
                            </Button>
                        </Item>
                    </Col></Row>
                </Form>
            )
        } else {
            return (<View/>)
        }
    }

}