import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  types,
  verifyingEmailSuccess,
  verifyingEmailFailure
} from "../reducers/signupReducer";

export function* verifyEmail({ form }) {
  try {
    const email = form.email;
    console.log("EMAIL", form.email);
    // Check if valid Cornell email format
    const emailValid = email.match(/^([a-z]{1,3})([0-9]{1,3})+@(cornell.edu)$/)
      ? true
      : false;
    console.log("EMAIL VALID", emailValid);
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
        email: email,
        error: e.message
      })
    );
    return false;
  }
}

export function* verifyFormFields({ payload }) {
  yield put({ type: types.VERIFYING_SIGNUP });
  const args = { form: payload };
  const verificationStatuses = yield {
    emailVerified: call(verifyEmail, args)
  };
  console.log(verificationStatuses);
  const verified = verificationStatuses.emailVerified;
  return verified;
}

export default [takeEvery(types.UPDATE_FORM_FIELDS, verifyFormFields)];
