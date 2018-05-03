import React from 'react'
import {Button, Col, Form, Icon, Input, Item, Label, Picker, Row, Text, View} from "native-base";
import {StyleSheet} from 'react-native';
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
        console.log("parsed", data);
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

        console.log("Confirmed RX DATA");
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
        if (this.state.barcode !== "") {
            return (
                <Form>
                    <Row>
                        <Text style={styles.instructions}>Select the pharmacy you used to fill your prescription. We will attempt to look up your
                            prescription information.</Text>
                    </Row>
                    <Row>
                        <Col>

                        <Item floatingLabel>
                            <Label>Barcode</Label>
                            <Input value={this.state.barcode}
                                   onChangeText={(text) => this.setState({barcode: text})}/>
                        </Item>

                        <Item fixedLabek>
                            <Label tyle={{flex: 0}}>Pharmacy</Label>
                            <PharmacyPicker onPharmacyPicked={this.pharmacyPickedHandler} />
                        </Item>
                        <Item>
                            <Button block primary
                                    style={styles.submit}
                                    onPress={() => this.confirmRxData() }>
                                <Text>Confirm</Text>
                            </Button>
                        </Item>
                    </Col></Row>
                </Form>
            )
        } else {
            return (<View><Text>Something wrong with barcode state setting</Text></View>)
        }
    }
}

const styles = StyleSheet.create({
    instructions: {
        marginLeft: 15,
        marginBottom: 15,
    },
    submit: {
        marginTop: 30
    }
});