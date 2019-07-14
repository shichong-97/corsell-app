import { put, select, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";
import { types } from "../reducers/loginReducer";

function* syncUser() {
  try {
    // API session request. delay() to show loader.
    yield delay(500);
    // For now we just get the state from the persisted reducer.
    const loggedIn = yield select(state => state.auth.loggedIn);
    const user = yield select(state => state.auth.user);

    yield put({ type: types.SYNC_USER_SUCCESS, loggedIn, user });
  } catch (error) {
    yield put({ type: types.SYNC_USER_ERROR, error });
  }
}

function* login() {
  try {
    // API login request (email: action.email, password: action.password)
    const user = {
      name: "John",
      lastname: "Doe"
    };

    yield put({ type: types.LOGIN_SUCCESS, user });
  } catch (error) {
    yield put({ type: types.LOGIN_ERROR, error });
  }
}

function* logout() {
  try {
    // API logout request
    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: types.LOGOUT_ERROR, error });
  }
}

export default [
  takeEvery(types.SYNC_USER, syncUser),
  takeEvery(types.LOGIN, login),
  takeEvery(types.LOGOUT, logout)
];
