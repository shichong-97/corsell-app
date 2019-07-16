import { put, takeEvery, call, all, takeLatest } from "redux-saga/effects";
import {
  types,
  signupSuccess,
  signupFailure,
  verifyingEmailSuccess,
  verifyingEmailFailure,
  verifyingPasswordSuccess,
  verifyingPasswordFailure,
  verifyingNameSuccess,
  verifyingNameFailure,
  verifyingUsernameSuccess,
  verifyingUsernameFailure,
  verifyingPhoneSuccess,
  verifyingPhoneFailure,
  verifyingYearSuccess,
  verifyingYearFailure,
  verifyingMajorSuccess,
  verifyingMajorFailure
} from "../reducers/signupReducer";
var firebase = require("firebase/app");

export function* verifyName({ form }) {
  try {
    const name = form.name;
    if (name == null) {
      throw new Error("Name cannot be empty!");
    }

    yield put(verifyingNameSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingNameFailure({
        name: form.name,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyPhone({ form }) {
  try {
    const phone = form.phone;
    if (phone == null) {
      throw new Error("Phone number cannot be empty!");
    }

    yield put(verifyingPhoneSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingPhoneFailure({
        phone: form.phone,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyYear({ form }) {
  try {
    const year = form.year;
    if (year == null) {
      throw new Error("Graduation year cannot be empty!");
    }

    // Check if valid year format
    const yearValid = year.match(/^[2][0][1-9]\d{1}$/) ? true : false;
    if (!yearValid) {
      throw new Error("Invalid Graduation Year Format");
    }

    yield put(verifyingYearSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingYearFailure({
        year: form.year,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyMajor({ form }) {
  try {
    const major = form.major;
    if (major == null) {
      throw new Error("Major cannot be empty!");
    }

    yield put(verifyingMajorSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingMajorFailure({
        major: form.major,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyUsername({ form }) {
  try {
    const username = form.username;
    if (username == null) {
      throw new Error("Username cannot be empty!");
    }

    // Validate that username does not already exist against database
    // throw new Error("Username already exists!")

    yield put(verifyingUsernameSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingUsernameFailure({
        username: form.username,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyEmail({ form }) {
  try {
    const email = form.email;

    if (email == null) {
      throw new Error("Email cannot be empty!");
    }

    // Check if valid Cornell email format
    const emailValid = email.match(/^([a-z]{1,3})([0-9]{1,4})@(cornell.edu)$/)
      ? true
      : false;
    if (!emailValid) {
      throw new Error("Invalid Cornell Email Format");
    }

    // Check if email already exists in database
    // throw new Error("Email already exists!")

    // Check if email address exists
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

    if (password == null) {
      throw new Error("Password cannot be empty!");
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
    passwordVerified: call(verifyPassword, args),
    nameVerified: call(verifyName, args),
    phoneVerified: call(verifyPhone, args),
    yearVerified: call(verifyYear, args),
    majorVerified: call(verifyMajor, args),
    usernameVerified: call(verifyUsername, args)
  });
  const verified =
    verificationStatuses.emailVerified &&
    verificationStatuses.passwordVerified &&
    verificationStatuses.nameVerified &&
    verificationStatuses.phoneVerified &&
    verificationStatuses.yearVerified &&
    verificationStatuses.majorVerified &&
    verificationStatuses.usernameVerified;

  try {
    if (!verified) {
      throw new Error("Signup Failure");
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    var db = firebase.firestore();
    db.collection("userDetails").add({
      email: payload.email,
      username: payload.username,
      name: payload.name,
      phone: payload.phone,
      major: payload.major,
      year: payload.year
      // address_one: payload.address_one,
      // address_two: payload.address_two,
      // terms: payload.terms
    });

    yield put(signupSuccess());
    return true;
  } catch (e) {
    yield put(
      signupFailure({
        signupError: e.message,
        signupErrorCode: e.code
      })
    );
    return false;
  }
}

export default [takeLatest(types.UPDATE_FORM_FIELDS, verifyFormFields)];
