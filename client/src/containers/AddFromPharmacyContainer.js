import React from 'react'
import {Button, Col, Form, Icon, Input, Item, Label, Picker, Row, Text, View} from "native-base";
import PharmacyPicker from "../components/PharmacyPicker";


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

    pharmacyPickedHandler = (picked) => {
        this.setState({
            pharmacy: picked
        })
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
                            <PharmacyPicker onPharmacyPicked={this.pharmacyPickedHandler}></PharmacyPicker>
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