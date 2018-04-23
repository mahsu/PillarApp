import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root} from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authenticated: false
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({fontsAreLoaded: true});
    }

    render() {

        if (!this.state.fontsAreLoaded) {
            return <View><Text>Loading</Text></View>;
        }

        return (
            <Root>
                <AppNavigator />
            </Root>
        );
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
