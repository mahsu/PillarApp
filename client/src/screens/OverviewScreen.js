import React from "react"
import {
    Body, Button, Card, CardItem, Col, Container, Content, Grid, H1, H3, Header, Icon, Text,
    View
} from "native-base";
import {StyleSheet} from "react-native";
import PaddedContainer from "../components/visual/PaddedContainer";
import MainTitle from "../components/visual/MainTitle";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Matt"
        }
    }

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
                        <Body><Text>You will be reminded in 3 hours, at 12PM to take your medication.</Text></Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>How are you feeling today?</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Grid>
                                <Col style={[styles.colGrid,styles.green]}>
                                    <Button style={styles.emojiButton} transparent={true}>
                                        <Icon style={styles.emojiIcon} name="ios-happy-outline"/>
                                    </Button>
                                </Col>
                                <Col style={{width: 20}}/>
                                <Col style={[styles.colGrid, styles.red]}>
                                    <Button style={styles.emojiButton} transparent={true}>
                                        <Icon style={styles.emojiIcon} name="ios-sad-outline"/>
                                    </Button>
                                </Col>
                            </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>

                    </Card>
                </Content>
            </PaddedContainer>

        )
    }
}

const styles = StyleSheet.create({
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