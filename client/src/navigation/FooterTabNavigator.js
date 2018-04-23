import React from "react";
import {TabNavigator} from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import {Button, Footer, FooterTab, Icon, Text} from "native-base";

const routes = [
    {
        "name": "test",
        "icon": "test"
    }
];

class FooterTabs extends React.Component {

    render() {
        return (
            <Container>
                <Header/>
                <Content/>
                <Footer>
                    <FooterTab>
                        <Button vertical
                                onPress={() => this.props.navigation.navigate(data)}>>
                            <Icon name="apps"/>
                            <Text>Apps</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera"/>
                            <Text>Camera</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="navigate"/>
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person"/>
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const FooterTabNavigator = TabNavigator(
    {
        Home: {screen: props => <HomeScreen {...props}/>},
    }, {
        initialRouteName: "Home",
        //contentComponent: props => <FooterTabs {...props} />
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            <Icon name="bowtie"/>
                            <Text>Home</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("JadeChat")}
                        >
                            <Icon name="briefcase"/>
                            <Text>Nine</Text>
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