import { put, takeEvery, call, all, takeLatest } from 'redux-saga/effects'
import {
  types,
  loginSuccess,
  loginFailure,
  verifyingEmailSuccess,
  verifyingEmailFailure,
  verifyingPasswordSuccess,
  verifyingPasswordFailure
} from '../reducers/loginReducer'
var firebase = require('firebase/app')

export function * verifyLoginEmail ({ form }) {
  try {
    const email = form.email

    if (email == null) {
      throw new Error('Email cannot be empty!')
    }

    yield put(verifyingEmailSuccess())
    return true
  } catch (e) {
    yield put(
      verifyingEmailFailure({
        email: form.email,
        error: e.message
      })
    )
    return false
  }
}

export function * verifyLoginPassword ({ form }) {
  try {
    const password = form.password

    if (password == null) {
      throw new Error('Password cannot be empty!')
    }

    yield put(verifyingPasswordSuccess())
    return true
  } catch (e) {
    yield put(
      verifyingPasswordFailure({
        password: form.password,
        error: e.message
      })
    )
    return false
  }
}

export function * verifyLoginForm ({ payload }) {
  yield put({ type: types.VERIFYING_LOGIN })
  const args = { form: payload }
  const verificationStatuses = yield all({
    emailVerified: call(verifyLoginEmail, args),
    passwordVerified: call(verifyLoginPassword, args)
  })
  const verified =
    verificationStatuses.emailVerified && verificationStatuses.passwordVerified

  try {
    if (!verified) {
      throw new Error('Login Failure')
    }

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)

    yield put(loginSuccess())
    return true
  } catch (e) {
    console.log('e.message', e.message)
    yield put(
      loginFailure({
        loginError: e.message
      })
    )
    return false
  }
}

export default [takeLatest(types.UPDATE_LOGIN_FIELDS, verifyLoginForm)]
