import React from 'react'
import {Container} from "native-base";
import {StyleSheet} from "react-native";

export default class PaddedContainer extends React.Component {
    render() {
        return (
            <Container style={styles.container}>{this.props.children}</Container>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 55,
        paddingLeft: 20,
        paddingRight: 20
    }
});