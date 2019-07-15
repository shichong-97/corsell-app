import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  types,
  signupSuccess,
  signupFailure,
  verifyingEmailSuccess,
  verifyingEmailFailure,
  verifyingPasswordSuccess,
  verifyingPasswordFailure
} from "../reducers/signupReducer";
var firebase = require("firebase/app");

export function* verifyEmail({ form }) {
  try {
    const email = form.email;

    if (email == "") {
      throw new Error("Email field cannot be empty!");
    }

    // Check if valid Cornell email format
    const emailValid = email.match(/^([a-z]{1,3})([0-9]{1,3})+@(cornell.edu)$/)
      ? true
      : false;
    if (!emailValid) {
      throw new Error("Invalid Cornell Email Format");
    }

    // Check if email address exists

    // Check if email already exists in database
    yield put(verifyingEmailSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingEmailFailure({
        email: form.email,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyPassword({ form }) {
  try {
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (password == "") {
      throw new Error("Password field cannot be empty!");
    }

    // Check if password is at least 8 characters, includes one lowercase, one uppercase, and one number
    const passwordValid = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    )
      ? true
      : false;
    if (!passwordValid) {
      throw new Error(
        "Password must contain at least 8 characters, include 1 lowercase letter, 1 uppercase letter, and 1 number"
      );
    }

    // Check if passwords match
    if (password != confirmPassword) {
      throw new Error("Passwords do not match");
    }
    yield put(verifyingPasswordSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingPasswordFailure({
        password: form.password,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyFormFields({ payload }) {
  yield put({ type: types.VERIFYING_SIGNUP });
  const args = { form: payload };
  const verificationStatuses = yield all({
    emailVerified: call(verifyEmail, args),
    passwordVerified: call(verifyPassword, args)
  });
  const verified =
    verificationStatuses.emailVerified && verificationStatuses.passwordVerified;
  if (verified) {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      var db = firebase.firestore();
      yield db.collection("userDetails").add({
        email: payload.email,
        username: payload.username
        // name: payload.name,
        // phone: payload.phone,
        // major: payload.major,
        // year: payload.year,
        // address_one: payload.address_one,
        // address_two: payload.address_two,
        // terms: payload.terms
      });

      yield put(signupSuccess());
      return true;
    } catch (e) {
      console.log("e.message", e.message);
      console.log("e.code", e.code);
      yield put(
        signupFailure({
          signupError: e.message,
          signupErrorCode: e.code
        })
      );
    }
  }
  return false;
}

export default [takeEvery(types.UPDATE_FORM_FIELDS, verifyFormFields)];
