import React, { Component } from "react";
import { showMessage } from "react-native-flash-message";

class SignupSuccessful extends Component {
  render() {
    console.log(this.props.showMessage, "WHETHER TO RENDER");
    const successMessage = this.props.showMessage
      ? showMessage({
          message: "Signup Successful!",
          description: "A confirmation email has been sent.",
          type: "success",
          floating: true
        })
      : null;

    return <>{successMessage}</>;
  }
}

export default SignupSuccessful;
