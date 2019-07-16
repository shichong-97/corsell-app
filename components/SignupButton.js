import React, { Component } from "react";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

// https://github.com/rcaferati/react-native-really-awesome-button

class SignupButton extends Component {
  render() {
    const { progress, onPress } = this.props;
    return (
      <AwesomeButtonRick
        width={250}
        type="primary"
        progress={progress}
        onPress={onPress}
      >
        Sign Up
      </AwesomeButtonRick>
    );
  }
}

export default SignupButton;
