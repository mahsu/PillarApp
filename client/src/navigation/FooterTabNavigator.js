import React from "react";
import {TabNavigator} from 'react-navigation';
import OverviewScreen from "../screens/OverviewScreen";
import MedicineScreen from "../screens/MedicineScreen";
import {Button, Footer, FooterTab, Icon, Text} from "native-base";

const FooterTabNavigator = TabNavigator(
    {
        Overview: {screen: props => <OverviewScreen {...props}/>},
        Medicine: {screen: props => <MedicineScreen {...props}/>}
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
                            onPress={() => props.navigation.navigate("NineChat")}
                        >
                            <Icon name="headset"/>
                            <Text>Jade</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    });

export default FooterTabNavigator;