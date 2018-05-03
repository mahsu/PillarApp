import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import BasicCamera from "../../components/BasicCamera";

export default class TakePictureScreen extends React.Component {

    static propTypes = {
        onPictureParsed: PropTypes.func
    };

    static defaultProps = {};

    onPictureParsed = (data) => {
        if (typeof this.props.navigation.state.params.onPictureParsed === 'function') {
            this.props.navigation.state.params.onPictureParsed(data);
            this.props.navigation.state.params.onPictureParsed = null; //prevent duplicate calls
        } else {
            console.log("onauthorizationparsed undefined");
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({taken: false});
    }

    componentDidMount() {
        console.log(this.props.navigation);
    }

    onPictureTaken = (data) => {
        if (!this.state.taken) {
            this.setState({taken: true});
            this.props.navigation.goBack();
            this.onPictureParsed(data);
        }
    };

    render() {
        return (
            <BasicCamera onPictureTaken={this.onPictureTaken}/>
        )
    }
}