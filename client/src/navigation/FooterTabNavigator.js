import React from "react";
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Button, Footer, FooterTab, Icon, Text} from "native-base";
import OverviewScreen from "../screens/OverviewScreen";
import MedicineScreen from "../screens/MedicineScreen";
import AddMedicineScreen from "../screens/AddMedicineScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import TakePictureContainer from "../containers/TakePictureContainer";
import BarCodeScannerContainer from "../screens/BarCodeScannerScreen";

const MedicineNavigator = StackNavigator(
    {
        MedicineSummary: {screen: props => <MedicineScreen {...props}/>},
        MedicineAdd: {screen: props => <AddMedicineScreen {...props}/>},
        TakePicture: {
            screen: props => <TakePictureContainer {...props}/>,
            navigationOptions: ({navigation}) => ({
                title: 'Take a Picture of Your Pill',
                tabBarVisible: false,
            })
        },
        BarCodeScanner: {
            screen: props => <BarCodeScannerContainer {...props}/>,
            navigationOptions: ({navigation}) => ({
                title: 'Scan a Prescription Barcode',
                tabBarVisible: false,
            })
        }
    },
);

const FooterTabNavigator = TabNavigator(
    {
        Overview: {screen: props => <OverviewScreen {...props}/>},
        Medicine: {screen: MedicineNavigator},
        Schedule: {screen: props => <ScheduleScreen {...props}/>}
    }, {
        initialRouteName: "Overview",
        //contentComponent: props => <FooterTabs {...props} />
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("Overview")}
                        >
                            <Icon name="bowtie"/>
                            <Text>Overview</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("Medicine")}
                        >
                            <Icon name="briefcase"/>
                            <Text>Medicine</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("Schedule")}
                        >
                            <Icon name="calendar"/>
                            <Text>Schedule</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);

export default FooterTabNavigator;