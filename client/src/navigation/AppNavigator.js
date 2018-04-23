import React, { Component } from "react";

import { StackNavigator } from "react-navigation";
import FooterTabNavigator from "./FooterTabNavigator";

const AppNavigator = StackNavigator(
    {
        FooterTabs: {screen: FooterTabNavigator},
    },
    {
        initialRouteName: "FooterTabs",
        headerMode: "none",

    }
);

export default AppNavigator;