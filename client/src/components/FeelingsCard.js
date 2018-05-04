import React from 'react';
import {Body, Button, Card, CardItem, Icon, Left, Text, View} from "native-base";


export default class FeelingsCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                        <Text>{data.time}</Text>
                        {data.isHappy
                            ? (<Text note style={{color: '#16632d'}}>Feeling Well</Text>)
                            : (<Text note style={{color: '#82281d'}}>Not Feeling Well</Text>)
                        }
                        </Body>
                    </Left>
                </CardItem>
                <CardItem bordered>
                    <Body>
                    {data.notes && data.notes.length > 0
                        ? (<Text style={{paddingLeft: 10}}>{data.notes}</Text>)
                        : (<Text note style={{paddingLeft: 10}}>No comments</Text>)
                    }

                    </Body>
                </CardItem>
            </Card>
        )
    }
}