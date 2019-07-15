const initialState = {
  verifying: false,
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  year: "",
  major: "",

  emailVerified: false,
  passwordVerified: false,
  // nameVerified: false,
  // yearVerified: false,
  // majorVerified: false

  errorMessages: { email: "", password: "" },

  signupError: null,
  signupErrorCode: null,
  signupSuccess: false,
  signupFailure: false
};

// Types
export const types = {
  SIGNUP: "SIGNUP",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
  VERIFYING_SIGNUP: "VERIFYING_SIGNUP",
  VERIFYING_EMAIL_SUCCESS: "VERIFYING_EMAIL_SUCCESS",
  VERIFYING_EMAIL_FAILURE: "VERIFYING_EMAIL_FAILURE",
  VERIFYING_PASSWORD_SUCCESS: "VERIFYING_PASSWORD_SUCCESS",
  VERIFYING_PASSWORD_FAILURE: "VERIFYING_PASSWORD_FAILURE",
  UPDATE_FORM_FIELDS: "UPDATE_FORM_FIELDS"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM_FIELDS:
      const event = action.payload;
      return {
        ...state,
        errorMessages: { email: "", password: "" },
        email: event.email,
        password: event.password,
        confirmPassword: event.confirmPassword,
        name: event.name,
        phone: event.phone,
        year: event.year,
        major: event.major
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        verifying: false,
        signupSuccess: true,
        signupFailure: false
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        verifying: false,
        signupSuccess: false,
        signupFailure: true
      };
    case types.VERIFYING_SIGNUP:
      return {
        ...state,
        verifying: true
      };
    case types.VERIFYING_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true
      };
    case types.VERIFYING_EMAIL_FAILURE:
      return {
        ...state,
        emailVerified: false,
        errorMessages: {
          ...state.errorMessages,
          email: action.error
        }
      };
    case types.VERIFYING_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordVerified: true
      };
    case types.VERIFYING_PASSWORD_FAILURE:
      return {
        ...state,
        passwordVerified: false,
        errorMessages: {
          ...state.errorMessages,
          password: action.error
        }
      };
    default:
      return state;
  }
}

// Actions
export function updateFormFields(payload) {
  return {
    type: types.UPDATE_FORM_FIELDS,
    payload
  };
}

export function verifyingEmailSuccess() {
  return {
    type: types.VERIFYING_EMAIL_SUCCESS
  };
}

export function verifyingEmailFailure({ error, email }) {
  return {
    type: types.VERIFYING_EMAIL_FAILURE,
    error,
    email
  };
}

export function verifyingPasswordSuccess() {
  return {
    type: types.VERIFYING_PASSWORD_SUCCESS
  };
}

export function verifyingPasswordFailure({ error, password }) {
  return {
    type: types.VERIFYING_PASSWORD_FAILURE,
    error,
    password
  };
}

export function signupSuccess() {
  return {
    type: types.SIGNUP_SUCCESS
  };
}

export function signupFailure({ signupError, signupErrorCode }) {
  return {
    type: types.SIGNUP_FAILURE,
    signupError,
    signupErrorCode
  };
}

// Getters
export function getErrorMessages(store) {
  return store.errorMessages;
}
