'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types'
import {RNCamera} from 'react-native-camera';

export default class BarCodeScanner extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        onBarCodeParsed: PropTypes.func
    };

    barCodeHandler = (data) => {
        console.log(data);
        if (typeof this.props.onBarCodeParsed === 'function') {
            this.props.onBarCodeParsed(data);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera'}
                    barCodeTypes={[
                        RNCamera.Constants.BarCodeType.code39,
                        RNCamera.Constants.BarCodeType.code39mod43,
                        RNCamera.Constants.BarCodeType.code93,
                        RNCamera.Constants.BarCodeType.code128,
                        RNCamera.Constants.BarCodeType.upce,
                        RNCamera.Constants.BarCodeType.interleaved2of5,
                        RNCamera.Constants.BarCodeType.itf14
                    ]}
                    onBarCodeRead={this.barCodeHandler}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});