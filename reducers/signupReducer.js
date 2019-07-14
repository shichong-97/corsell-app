const initialState = {
  verifying: false,
  success: false,
  error: null,
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
    // switch (event) {
    //   case "email":
    //     console.log("EMAIL", event.target.value);
    //     return {
    //       ...state,
    //       email: event.target.value
    //     };
    //   case "password":
    //     console.log("PASSWORD", event.target.value);
    //     return {
    //       ...state,
    //       password: event.target.value
    //     };
    //   case "confirmPassword":
    //     return {
    //       ...state,
    //       confirmPassword: event.target.value
    //     };
    //   case "name":
    //     return {
    //       ...state,
    //       name: event.target.value
    //     };
    //   case "phone":
    //     return {
    //       ...state,
    //       phone: event.target.value
    //     };
    //   case "year":
    //     return {
    //       ...state,
    //       year: event.target.value
    //     };
    //   case "major":
    //     return {
    //       ...state,
    //       major: event.target.value
    //     };
    //   default:
    //     return state;
    // }
    case types.VERIFYING_SIGNUP:
      return {
        ...state,
        verifying: true
      };
    case types.VERIFYING_CERTIFICATE_ISSUED_SUCCESS:
      return {
        ...state,
        emailVerified: true
      };
    case types.VERIFYING_EMAIL_FAILURE:
      console.log("ACTION.ERROR", action.error);
      return {
        ...state,
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
  console.log("VERIFYING EMAIL FAILURE");
  console.log("ERROR", error);
  console.log("EMAIL", email);
  return {
    type: types.VERIFYING_EMAIL_FAILURE,
    error,
    email
  };
}
