import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoginNavigator from "./LoginNavigator";
import Loading from "../screens/AuthenticationScreen/Loading";

const AppNavigator = createSwitchNavigator(
  {
    // Splash: SplashScreen,
    LoginNavigator: LoginNavigator,
    MainTabNavigator: MainTabNavigator,
    Loading: Loading
  },
  { initialRouteName: "Loading", headerMode: "none" }
);

export default createAppContainer(AppNavigator);
