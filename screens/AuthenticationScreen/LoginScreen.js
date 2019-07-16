import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
  KeyboardAvoidingView
} from "react-native";
import Button from "../../components/Button";
import FormTextInput from "../../components/FormTextInput";
import { connect } from "react-redux";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TEMP
      email: null,
      password: null
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // this.state.client.auth
    //   .loginWithCredential(new AnonymousCredential())
    //   .then(user => {
    //     console.log(`Successfully logged in as user ${user.id}`);
    //     this.setState({ currentUserId: user.id });
    //   })
    //   .catch(err => {
    //     console.log(`Failed to log in anonymously: ${err}`);
    //     this.setState({ currentUserId: undefined });
    //   });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../../assets/images/corsell-logo.jpg")}
          style={styles.logo}
        />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
          />
          <Button label="Login" onPress={this.handleLogin} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default connect()(LoginScreen);
