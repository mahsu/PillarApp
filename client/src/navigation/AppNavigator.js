import React, { Component } from "react";

import { StackNavigator } from "react-navigation";
import FooterTabNavigator from "./FooterTabNavigator";
import InternalDev from "../screens/InternalDev";

const AppNavigator = StackNavigator(
    {
        InternalDev: {screen: InternalDev},
        FooterTabs: {screen: FooterTabNavigator},
    },
    {
        initialRouteName: "InternalDev",
        headerMode: "none",

    }
);

export default AppNavigator;