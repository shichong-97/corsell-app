import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView
} from "react-native";
import Button from "../../components/Button";
import {
  Stitch,
  UserPasswordAuthProviderClient
} from "mongodb-stitch-react-native-sdk";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import { updateFormFields } from "../../reducers/signupReducer";
import PropTypes from "prop-types";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  confirmPassword: t.maybe(t.String),
  name: t.maybe(t.String),
  phone: t.maybe(t.String),
  year: t.maybe(t.String),
  major: t.maybe(t.String)
  // terms: t.Boolean
});

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      phone: null
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  // handleEmailChange(event) {
  //   this.setState({ email: event.target.email });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.password });
  // }

  handleSignUp() {
    const value = this._form.getValue();
    console.log("value: ", value);

    this.props.updateFormFields(value);

    // try {
    //   let response = await fetch("http://192.168.1.3:3456/express_backend")
    //     .then(console.log("SUCCESS"))
    //     .catch(err => console.log(err));
    //   console.log("RESPONSE", response);
    //   let responseJson = await response.json();
    //   console.log("DICKED SUCKED");
    //   return responseJson;
    // } catch (error) {
    //   console.log("SUCK MY DICK");
    //   console.error(error);
    // }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <Form ref={c => (this._form = c)} type={User} options={options} />
          {/* <View style={styles.form}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholder="Password"
          />
          <TextInput
            style={styles.input}
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
          />
          <TextInput
            style={styles.input}
            value={this.state.phone}
            placeholder="Phone Number"
          />
        </View> */}
          <Button label="Sign Up" onPress={this.handleSignUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

SignupScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  input: {
    height: 40,
    borderColor: "#C0C0C0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

const options = {
  fields: {
    email: {
      error:
        "Without an email address how are you going to reset your password when you forget it?"
    },
    password: {
      error:
        "Choose something you use on a dozen other sites or something you won't remember"
    },
    terms: {
      label: "Agree to Terms"
    }
  },
  stylesheet: formStyles
};

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const mapDispatchToProps = dispatch => ({
  updateFormFields: payload => dispatch(updateFormFields(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(SignupScreen);

SignupScreen.propTypes = {
  updateFormFields: PropTypes.func
};
