import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
// import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { Provider } from "react-redux";
import store from "./store";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      client: null
    };
    // this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    // this._loadClient();
    // console.log(this.state.client, "CLIENT");
  }

  render() {
    const Root = () => {
      return (
        <>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </>
      );
    };

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Provider store={store}>
            <Root />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  // _loadClient() {
  //   const client = Stitch.initializeDefaultAppClient("corsell-app-test-brbmv");
  //   this.setState({ client });
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
