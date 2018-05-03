import React from 'react'
import {H1} from "native-base";
import {StyleSheet} from "react-native";

export default class MainTitle extends React.Component {
    render() {
        return (
            <H1 style={styles.title}>{this.props.children}</H1>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        paddingLeft: 10,
        paddingBottom: 10
    }
});