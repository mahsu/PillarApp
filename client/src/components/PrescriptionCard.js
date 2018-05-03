import React from "react"
import {Body, Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail, View} from "native-base";
import {Image} from "react-native";

export default class PrescriptionCard extends React.Component {
    constructor(props) {
        super(props)
    };


    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                        <Text>{this.props.data.name}</Text>
                        <View style={{
                            paddingTop: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Icon
                                style={{
                                    fontSize: 16
                                }}
                                name="ios-clock-outline"/>
                            <Text
                                note style={{
                                paddingLeft: 5
                            }}>3 Hr 15 Min</Text>
                        </View>
                        </Body>
                    </Left>
                </CardItem>
                {(this.props.data.pill_b64 && this.props.data.pill_b64.length !== 0)
                    ? (
                        <CardItem cardBody>
                            <Image source={{uri: this.props.data.pill_b64}}
                                   style={{height: 150, width: null, flex: 1}}/>
                        </CardItem>
                    )
                    : (<View/>)
                }
                <CardItem bordered>
                    <Body>
                    <Text>Instructions: {this.props.data.instructions}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon name="ios-alarm"/>
                            <Text>Snooze</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="ios-cart"/>
                        <Text>Reorder</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="ios-settings"/>
                            <Text>Edit</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}