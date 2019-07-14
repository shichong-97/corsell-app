import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/AuthenticationScreen/LoginScreen";
import SignupScreen from "../screens/AuthenticationScreen/SignupScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

LoginStack.path = "";

const SignupStack = createStackNavigator(
  {
    Signup: SignupScreen
  },
  config
);

SignupStack.navigationOptions = {
  tabBarLabel: "Sign up",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

SignupStack.path = "";

const LoginNavigator = createBottomTabNavigator({
  LoginStack,
  SignupStack
});

LoginNavigator.path = "";

export default LoginNavigator;
