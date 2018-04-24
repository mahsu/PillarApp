import React from "react";
import {TabNavigator} from 'react-navigation';
import OverviewScreen from "../screens/OverviewScreen";
import MedicineScreen from "../screens/MedicineScreen";
import {Button, Footer, FooterTab, Icon, Text} from "native-base";
import ScheduleScreen from "../screens/ScheduleScreen";

const FooterTabNavigator = TabNavigator(
    {
        Overview: {screen: props => <OverviewScreen {...props}/>},
        Medicine: {screen: props => <MedicineScreen {...props}/>},
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
    });

export default FooterTabNavigator;