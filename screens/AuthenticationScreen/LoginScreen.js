import React, { Component } from "react";
import {
  Platform,
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView
} from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import {
  updateLoginForm,
  resetLoginForm,
  getFormValues,
  getErrorMessages,
  getVerifying,
  getLoginSuccess
} from "../../reducers/loginReducer";
import SignupButton from "../../components/SignupButton";

const Form = t.form.Form;
var _ = require("lodash");

const User = t.struct({
  email: t.maybe(t.String),
  password: t.maybe(t.String)
  // remember: t.Boolean
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    console.log(this.props.onLoginCompleted, "FUNCTION HERE");
  }

  handleLogin() {
    const value = this._form.getValue();
    console.log("value", value);
    this.props.updateLoginForm(value);
  }

  componentDidUpdate() {
    if (this.props.loginSuccess === true) {
      this.props.resetLoginForm();
      this.props.onLoginCompleted;
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
        }
      },
      stylesheet: formStyles
    };
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../../assets/images/corsell-logo.jpg")}
          style={styles.logo}
        />
        <View style={styles.formContainer}>
          <Form
            ref={c => (this._form = c)}
            type={User}
            options={options}
            value={this.props.formValues}
          />
          <SignupButton
            progress={this.props.verifying}
            onPress={this.handleLogin}
          />
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
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  errorMessages: getErrorMessages(store.loginReducer),
  verifying: getVerifying(store.loginReducer),
  loginSuccess: getLoginSuccess(store.loginReducer),
  formValues: getFormValues(store.loginReducer)
});

const mapDispatchToProps = dispatch => ({
  updateLoginForm: payload => dispatch(updateLoginForm(payload)),
  resetLoginForm: () => dispatch(resetLoginForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
