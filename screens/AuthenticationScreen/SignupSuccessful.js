import React from 'react'
import { showMessage as show } from 'react-native-flash-message'

const SignupSuccessful = ({ showMessage }) => {
  const successMessage =
    showMessage &&
    show({
      message: 'Signup Successful!',
      description: 'A confirmation email has been sent.',
      type: 'success',
      floating: true
    })

  return <>{successMessage}</>
}

export default SignupSuccessful
