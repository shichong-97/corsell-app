import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView
} from "react-native";
import Button from "../../components/Button";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import {
  updateFormFields,
  getErrorMessages
} from "../../reducers/signupReducer";
import PropTypes from "prop-types";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  confirmPassword: t.String,
  name: t.maybe(t.String),
  phone: t.maybe(t.String),
  year: t.maybe(t.String),
  major: t.maybe(t.String)
  // terms: t.Boolean
});

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    const value = this._form.getValue();
    this.props.updateFormFields(value);
  }

  render() {
    let options = {
      fields: {
        email: {
          hasError: this.props.errorMessages.email == "" ? false : true,
          error: this.props.errorMessages.email
        },
        password: {
          hasError: this.props.errorMessages.password == "" ? false : true,
          error: this.props.errorMessages.password
        },
        confirmPassword: {
          hasError:
            this.props.errorMessages.password == "Passwords do not match",
          error: this.props.errorMessages.password
        },
        terms: {
          label: "Agree to Terms"
        }
      },
      stylesheet: formStyles
    };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <Form ref={c => (this._form = c)} type={User} options={options} />
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

const mapStateToProps = store => ({
  errorMessages: getErrorMessages(store.signupReducer)
});

const mapDispatchToProps = dispatch => ({
  updateFormFields: payload => dispatch(updateFormFields(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

SignupScreen.propTypes = {
  updateFormFields: PropTypes.func
};
