import React from 'react'
import {Icon, Picker} from "native-base";
import {Platform} from "react-native";

export default class PharmacyPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        }
    }

    dropdownSelectedHandler = (selected) => {
        this.setState({
            selected
        });
        if (typeof this.props.onPharmacyPicked === 'function') {
            this.props.onPharmacyPicked(selected);
        }
    };

    render() {
        return (
            <Picker
                iosHeader="Select Your Pharmacy"
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                placeholder="Select Your Pharmacy"
                placeholderStyle={{color: "#bfc6ea"}}
                placeholderIconColor="#007aff"
                style={{ width: (Platform.OS === 'ios') ? undefined : '100%' }}
                selectedValue={this.state.selected}
                onValueChange={(str) => {
                    this.dropdownSelectedHandler(str)
                }}
            >
                <Picker.Item label="Empire State Pharmacy" value="Empire State Pharmacy"/>
                <Picker.Item label="Garden State Pharmacy" value="Garden State Pharmacy"/>
                <Picker.Item label="Sunshine State Pharmacy" value="Sunshine State Pharmacy"/>
            </Picker>
        )
    }
}