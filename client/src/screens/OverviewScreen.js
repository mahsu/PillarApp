import React from "react"
import {Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Text, View} from "native-base";
import {StyleSheet} from "react-native";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Container>
                <Header/>
                <Content>
                    <View style={styles.container}>
                        <Text>Overview Content</Text>
                    </View>
                    <Card>
                        <CardItem>
                        <Body><Text>Hello</Text></Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>How are you feeling today?</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Grid>
                                <Col style={{backgroundColor: '#635DB7', height: 200}}>
                                    <Button><Text>:)</Text></Button>
                                </Col>
                                <Col style={{backgroundColor: '#00CE9F', height: 200}}>
                                    <Button><Text>:(</Text></Button>
                                </Col>
                            </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});