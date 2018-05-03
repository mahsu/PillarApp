import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import BarCodeScanner from "../../components/BarCodeScanner";

export default class BarCodeScannerContainer extends React.Component {

    static propTypes = {
        onBarCodeParsed: PropTypes.func
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({taken: false});
    }

    componentDidMount() {
        console.log(this.props.navigation);
    }

    barCodeScanHandler = (data) => {
        if (!this.state.taken) {
            this.setState({taken: true});
            console.log("Navigation handler called");

            if (typeof this.props.navigation.state.params.onBarCodeParsed === 'function') {
                this.props.navigation.state.params.onBarCodeParsed(data);
                this.props.navigation.goBack();
                this.props.navigation.state.params.onBarCodeParsed = null; //prevent duplicate calls
            } else {
                console.log("onBarCodeparsed undefined");
            }

        }
    };

    render() {
        return (
            <BarCodeScanner onBarCodeParsed={this.barCodeScanHandler}/>
        )
    }
}