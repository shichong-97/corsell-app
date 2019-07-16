import React from 'react'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'

// https://github.com/rcaferati/react-native-really-awesome-button

const SignupButton = ({ progress, onPress }) => {
  return (
    <AwesomeButtonRick
      width={250}
      type='primary'
      progress={progress}
      onPress={onPress}
    >
      Sign Up
    </AwesomeButtonRick>
  )
}

export default SignupButton
