import React, { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import {
  updateFormFields,
  resetFormFields,
  getFormValues,
  getErrorMessages,
  getVerifying,
  getSuccess
} from '../../reducers/signupReducer'
import t from 'tcomb-form-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SignupButton from '../../components/SignupButton'
import SignupSuccessful from './SignupSuccessful'

const Form = t.form.Form

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
})

const SignupScreen = ({
  errorMessages,
  verifying,
  signupSuccess,
  formValues,
  updateForm,
  resetForm
}) => {
  useEffect(() => {
    if (signupSuccess === true) {
      console.log('Sign up success!')
      resetForm()
    }
  }, [signupSuccess])

  const [formRef, setFormRef] = useState({})

  const handleSignUp = () => {
    const value = formRef.getValue()
    updateForm(value)
  }

  //should isolate this somewhere else -SC
  const options = {
    auto: 'none',
    fields: {
      email: {
        hasError: errorMessages.email != '',
        error: errorMessages.email,
        placeholder: 'Email'
      },
      password: {
        hasError: errorMessages.password != '',
        error: errorMessages.password,
        placeholder: 'Password',
        password: true,
        secureTextEntry: true
      },
      confirmPassword: {
        hasError: errorMessages.password == 'Passwords do not match',
        error: errorMessages.password,
        placeholder: 'Confirm Password',
        password: true,
        secureTextEntry: true
      },
      name: {
        hasError: errorMessages.name != '',
        error: errorMessages.name,
        placeholder: 'Name'
      },
      username: {
        hasError: errorMessages.username != '',
        error: errorMessages.username,
        placeholder: 'Username'
      },
      phone: {
        hasError: errorMessages.phone != '',
        error: errorMessages.phone,
        placeholder: 'Phone Number'
      },
      year: {
        hasError: errorMessages.year != '',
        error: errorMessages.year,
        placeholder: 'Graduation Year'
      },
      major: {
        hasError: errorMessages.major != '',
        error: errorMessages.major,
        placeholder: 'Major (eg. Economics)'
      },
      terms: {
        label: 'Agree to Terms'
      }
    },
    stylesheet: formStyles
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <Form
            ref={c => setFormRef(c)}
            type={User}
            options={options}
            value={formValues}
          />
          <SignupButton progress={verifying} onPress={handleSignUp} />
        </View>
      </ScrollView>
      <SignupSuccessful showMessage={signupSuccess} />
    </KeyboardAvoidingView>
  )
}

SignupScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    color: '#e93766',
    fontSize: 40
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  signupButton: {
    width: 350,
    paddingVertical: 12,
    borderRadius: 8
  }
})

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
      justifyContent: 'center',
      width: 350,
      marginHorizontal: 40
    },
    error: {
      marginBottom: 10,
      justifyContent: 'center',
      width: 350,
      marginHorizontal: 40
    }
  },
  controlLabel: {
    normal: {
      color: '#000000',
      fontSize: 20,
      marginBottom: 7,
      fontWeight: '500'
    },
    // the style applied when a validation error occours
    error: {
      color: '#a94442',
      fontSize: 20,
      marginBottom: 7,
      fontWeight: '500'
    }
  },
  errorBlock: {
    fontSize: 15,
    marginBottom: 2,
    color: '#a94442',
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
      borderColor: '#9b9b9b',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 8,
      marginVertical: 15,
      marginHorizontal: 30
    },
    // the style applied when a validation error occours
    error: {
      color: '#000000',
      fontSize: 20,
      height: 36,
      paddingVertical: Platform.OS === 'ios' ? 7 : 0,
      paddingHorizontal: 7,
      borderColor: '#a94442',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 5,
      marginHorizontal: 30
    }
  }
}

const mapStateToProps = store => ({
  errorMessages: getErrorMessages(store.signupReducer),
  verifying: getVerifying(store.signupReducer),
  signupSuccess: getSuccess(store.signupReducer),
  formValues: getFormValues(store.signupReducer)
})

const mapDispatchToProps = dispatch => ({
  updateForm: payload => dispatch(updateFormFields(payload)),
  resetForm: () => dispatch(resetFormFields())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)

SignupScreen.propTypes = {
  updateForm: PropTypes.func,
  resetForm: PropTypes.func
}
