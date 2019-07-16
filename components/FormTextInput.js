import React, { Component } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const FormTextInput = ({ style, ...otherProps }) => {
  return (
    <TextInput
      selectionColor='#b31b1b'
      style={[styles.textInput, style]}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#C0C0C0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
})

export default FormTextInput
