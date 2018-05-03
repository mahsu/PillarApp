import React from 'react';
import {Body, Button, Card, CardItem, Col, Container, Content, Row, Text, View} from "native-base";
import PaddedContainer from "../../components/visual/PaddedContainer";
import {StyleSheet} from "react-native";
import MainTitle from "../../components/visual/MainTitle";
import PrescriptionCard from "../../components/PrescriptionCard";

const medicineList = [
    {
        name: "name",
        pharmacy: "pharmacy",
        rxnum: "",
        barcode: "",
        pill_b64: "",
        schedule: "",
        instructions: ""
    }
];

export default class MedicineScreen extends React.Component {


    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            medicineList: []
        }
    }


    render() {
        const navstate = this.props.navigation.state.params;
        return (
            <PaddedContainer>
                <Content>
                    <Row>
                        <MainTitle>Prescriptions</MainTitle>
                    </Row>
                    <Row>
                        <Col>
                            {(!this.state.medicineList || this.state.medicineList.length === 0)
                                ? (
                                <Card>
                                    <CardItem>
                                        <Body>
                                        <Text>No prescriptions being tracked. Add one by
                                            pressing below!</Text>
                                        </Body>
                                    </CardItem>
                                </Card>)
                                : this.state.medicineList.map((item, index) => {
                                    return (<PrescriptionCard data={item} />)
                                })
                            }
                        </Col>
                    </Row>
                    <Row style={{paddingTop: 30}}>
                        <Button
                            style={styles.AddPrescriptionButton}
                            onPress={() => {
                                this.props.navigation.navigate("MedicineAdd", navstate)
                            }}>
                            <Text>Add Prescription</Text>
                        </Button>
                    </Row>
                </Content>
            </PaddedContainer>
        )
    }
}

const styles = StyleSheet.create({
    AddPrescriptionButton: {
        flex: 1,
        justifyContent: 'center'
    }
});