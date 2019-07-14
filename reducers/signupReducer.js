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

  errorMessages: []
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
        email: event.email,
        password: event.password,
        confirmPassword: event.confirmPassword,
        name: event.name,
        phone: event.phone,
        year: event.year,
        major: event.major
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
        errorMessages: [
          ...state.errorMessages,
          {
            email: action.error //action.email
          }
        ]
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
  console.log("FAILURE");
  return {
    type: types.VERIFYING_EMAIL_FAILURE,
    error,
    email
  };
}
