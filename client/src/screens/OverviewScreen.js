import React from "react"
import {
    Body,
    Button,
    Card,
    CardItem,
    Col,
    Container,
    Content,
    Form,
    Grid,
    H1,
    H3,
    Header,
    Icon, Input,
    Item, Label,
    Left,
    Right,
    Row,
    Text,
    View
} from "native-base";
import {StyleSheet} from "react-native";
import PaddedContainer from "../components/visual/PaddedContainer";
import MainTitle from "../components/visual/MainTitle";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Matt",
            feelingFormVisible: false,
            formdata: {
                isHappy: false,

            }
        };

        this.feelings = [];
    }

    feelingHandler = (isHappy) => {
        this.setState({
            formdata: {
                isHappy: isHappy,
                notes: '',
            },
            feelingFormVisible: true
        })
    };

    submitFeelingFormHandler = () => {
        let formdata = this.state.formdata;
        formdata.timestamp = new Date();
        this.feelings.push(formdata);

        this.setState({
            formdata: {
                isHappy: false,
                notes: ''
            },
            feelingFormVisible: false,

        })
    };

    render() {
        return (
            <PaddedContainer>
                <Content>
                    <MainTitle>Overview</MainTitle>
                    <Card>
                        <CardItem header>
                            <Text>Welcome back, {this.state.name}.</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <H3>Next Reminder in:</H3>
                            <View style={styles.reminderContainer}>
                                <Icon style={styles.reminderClock} name="ios-clock-outline"/>
                                <Text style={styles.reminderText}>3 Hr 24 Min</Text>
                            </View>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>How are you feeling right now?</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Grid>
                                <Col style={[styles.colGrid, styles.green]}>
                                    <Button
                                        style={styles.emojiButton}
                                        transparent={true}
                                        onPress={() => this.feelingHandler(true)}>
                                        <Icon style={styles.emojiIcon} name="ios-happy-outline"/>
                                    </Button>
                                </Col>
                                <Col style={{width: 20}}/>
                                <Col style={[styles.colGrid, styles.red]}>
                                    <Button
                                        style={styles.emojiButton}
                                        transparent={true}
                                        onPress={() => this.feelingHandler(false)}>
                                        <Icon style={styles.emojiIcon} name="ios-sad-outline"/>
                                    </Button>
                                </Col>
                            </Grid>

                            {this.state.feelingFormVisible ? (
                                    < Form style={{
                                        width: "100%"
                                    }}>
                                        <Row><Col>
                                            <Item floatingLabel>
                                                <Label>Notes</Label>
                                                <Input
                                                    value={this.state.formdata.notes}
                                                    onChange={(evt) => this.setState({
                                                        formdata: {
                                                            ...this.state.formdata,
                                                            notes: evt.nativeEvent.text
                                                        }
                                                    })}/>
                                            </Item>
                                            <Button block primary
                                                    style={styles.submit}
                                                    onPress={() => {
                                                        this.submitFeelingFormHandler()
                                                    }}
                                                    disabled={false}>
                                                <Text>Submit</Text>
                                            </Button>
                                        </Col></Row>
                                    </Form>)
                                : (<View/>)
                            }
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Left>
                                <Text>My Pillar Portable</Text>
                            </Left>
                            <Right>
                                <Button transparent={true}>
                                    <Icon name="ios-refresh"/>
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>Status: Connected</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </PaddedContainer>

        )
    }
}

const styles = StyleSheet.create({
    submit: {
        marginTop: 15
    },
    reminderClock: {
        fontSize: 42
    },
    reminderText: {
        fontSize: 25,
        paddingLeft: 20
    },
    reminderContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    red: {
        backgroundColor: '#c0392b'
    },
    green: {
        backgroundColor: '#27ae60'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colGrid: {
        padding: 10,
        flex: 1,
        height: 100,
        borderRadius: 5
    },
    emojiButton: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 0,
        justifyContent: 'center',
    },
    emojiIcon: {
        paddingLeft: 5,
        opacity: 1,
        color: "#000000",
        fontSize: 80
    }
});