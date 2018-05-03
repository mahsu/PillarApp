import React from "react"
import {Body, Button, Card, CardItem, Icon, Left, Text, Thumbnail} from "native-base";
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
                        <Thumbnail source={{uri: 'Image URL'}} />
                        <Body>
                        <Text>NativeBase</Text>
                        <Text note>GeekyAnts</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>4 Comments</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}