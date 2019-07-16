import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView
} from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import {
  updateFormFields,
  resetForm,
  getFormValues,
  getErrorMessages,
  getVerifying,
  getSuccess
} from "../../reducers/signupReducer";
import PropTypes from "prop-types";
import SignupButton from "../../components/SignupButton";
import SignupSuccessful from "./SignupSuccessful";

const Form = t.form.Form;
var _ = require("lodash");

const User = t.struct({
  email: t.maybe(t.String),
  username: t.maybe(t.String),
  password: t.maybe(t.String),
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
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    const value = this._form.getValue();
    this.props.updateFormFields(value);
  }

  componentDidUpdate() {
    if (this.props.signupSuccess === true) {
      console.log("CLEAR");
      this.props.resetForm();
    }
  }

  render() {
    let options = {
      auto: "none",
      fields: {
        email: {
          hasError: this.props.errorMessages.email == "" ? false : true,
          error: this.props.errorMessages.email,
          placeholder: "Email"
        },
        password: {
          hasError: this.props.errorMessages.password == "" ? false : true,
          error: this.props.errorMessages.password,
          placeholder: "Password"
        },
        confirmPassword: {
          hasError:
            this.props.errorMessages.password == "Passwords do not match",
          error: this.props.errorMessages.password,
          placeholder: "Confirm Password"
        },
        name: {
          hasError: this.props.errorMessages.name == "" ? false : true,
          error: this.props.errorMessages.name,
          placeholder: "Name"
        },
        username: {
          hasError: this.props.errorMessages.username == "" ? false : true,
          error: this.props.errorMessages.username,
          placeholder: "Username"
        },
        phone: {
          hasError: this.props.errorMessages.phone == "" ? false : true,
          error: this.props.errorMessages.phone,
          placeholder: "Phone Number"
        },
        year: {
          hasError: this.props.errorMessages.year == "" ? false : true,
          error: this.props.errorMessages.year,
          placeholder: "Graduation Year"
        },
        major: {
          hasError: this.props.errorMessages.major == "" ? false : true,
          error: this.props.errorMessages.major,
          placeholder: "Major (eg. Economics)"
        },
        terms: {
          label: "Agree to Terms"
        }
      },
      stylesheet: formStyles
    };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.signupContainer}>
          <Text style={{ color: "#e93766", fontSize: 40 }}>Sign Up</Text>
        </View>
        <ScrollView>
          <View style={styles.formContainer}>
            <Form
              ref={c => (this._form = c)}
              type={User}
              options={options}
              value={this.props.formValues}
            />
            <SignupButton
              progress={this.props.verifying}
              onPress={this.handleSignUp}
            />
          </View>
        </ScrollView>
        <SignupSuccessful showMessage={this.props.signupSuccess} />
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
    backgroundColor: "#fff"
  },
  signupContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 40
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  signupButton: {
    width: 350,
    paddingVertical: 12,
    borderRadius: 8
  }
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      justifyContent: "center",
      width: 350,
      marginHorizontal: 40
    },
    error: {
      marginBottom: 10,
      justifyContent: "center",
      width: 350,
      marginHorizontal: 40
    }
  },
  controlLabel: {
    normal: {
      color: "#000000",
      fontSize: 20,
      marginBottom: 7,
      fontWeight: "500"
    },
    // the style applied when a validation error occours
    error: {
      color: "#a94442",
      fontSize: 20,
      marginBottom: 7,
      fontWeight: "500"
    }
  },
  errorBlock: {
    fontSize: 15,
    marginBottom: 2,
    color: "#a94442",
    marginHorizontal: 30
  },
  textboxView: {
    normal: {},
    error: {},
    notEditable: {}
  },
  textbox: {
    normal: {
      height: 40,
      fontSize: 20,
      borderColor: "#9b9b9b",
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 8,
      marginVertical: 15,
      marginHorizontal: 30
    },
    // the style applied when a validation error occours
    error: {
      color: "#000000",
      fontSize: 20,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderColor: "#a94442",
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 5,
      marginHorizontal: 30
    }
  }
};

const mapStateToProps = store => ({
  errorMessages: getErrorMessages(store.signupReducer),
  verifying: getVerifying(store.signupReducer),
  signupSuccess: getSuccess(store.signupReducer),
  formValues: getFormValues(store.signupReducer)
});

const mapDispatchToProps = dispatch => ({
  updateFormFields: payload => dispatch(updateFormFields(payload)),
  resetForm: () => dispatch(resetForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

SignupScreen.propTypes = {
  updateFormFields: PropTypes.func
};
