import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import signupSaga from "./signupSaga";

function* rootSaga() {
  yield all([...loginSaga, ...signupSaga]);
}

export default rootSaga;
