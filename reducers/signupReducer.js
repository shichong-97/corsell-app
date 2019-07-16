export const initialState = {
  verifying: false,
  values: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    phone: '',
    year: '',
    major: ''
  },
  emailVerified: false,
  passwordVerified: false,
  nameVerified: false,
  usernameVerified: false,
  phoneVerified: false,
  yearVerified: false,
  majorVerified: false,

  errorMessages: {
    email: '',
    password: '',
    username: '',
    name: '',
    phone: '',
    year: '',
    major: ''
  },

  signupError: null,
  signupErrorCode: null,
  signupSuccess: false,
  signupFailure: false
}

// Types
export const types = {
  SIGNUP: 'SIGNUP',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  VERIFYING_SIGNUP: 'VERIFYING_SIGNUP',
  VERIFYING_EMAIL_SUCCESS: 'VERIFYING_EMAIL_SUCCESS',
  VERIFYING_EMAIL_FAILURE: 'VERIFYING_EMAIL_FAILURE',
  VERIFYING_PASSWORD_SUCCESS: 'VERIFYING_PASSWORD_SUCCESS',
  VERIFYING_PASSWORD_FAILURE: 'VERIFYING_PASSWORD_FAILURE',
  VERIFYING_NAME_SUCCESS: 'VERIFYING_NAME_SUCCESS',
  VERIFYING_NAME_FAILURE: 'VERIFYING_NAME_FAILURE',
  VERIFYING_USERNAME_SUCCESS: 'VERIFYING_USERNAME_SUCCESS',
  VERIFYING_USERNAME_FAILURE: 'VERIFYING_USERNAME_FAILURE',
  VERIFYING_PHONE_SUCCESS: 'VERIFYING_PHONE_SUCCESS',
  VERIFYING_PHONE_FAILURE: 'VERIFYING_PHONE_FAILURE',
  VERIFYING_YEAR_SUCCESS: 'VERIFYING_YEAR_SUCCESS',
  VERIFYING_YEAR_FAILURE: 'VERIFYING_YEAR_FAILURE',
  VERIFYING_MAJOR_SUCCESS: 'VERIFYING_MAJOR_SUCCESS',
  VERIFYING_MAJOR_FAILURE: 'VERIFYING_MAJOR_FAILURE',
  UPDATE_FORM_FIELDS: 'UPDATE_FORM_FIELDS',
  RESET_FORM: 'RESET_FORM'
}

// Reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM_FIELDS:
      const event = action.payload
      return {
        ...initialState,
        errorMessages: {
          email: '',
          password: '',
          username: '',
          name: '',
          phone: '',
          year: '',
          major: ''
        },
        values: {
          email: event.email,
          password: event.password,
          confirmPassword: event.confirmPassword,
          name: event.name,
          username: event.username,
          phone: event.phone,
          year: event.year,
          major: event.major
        }
      }
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        verifying: false,
        signupSuccess: true,
        signupFailure: false
      }
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        verifying: false,
        signupSuccess: false,
        signupFailure: true
      }
    case types.VERIFYING_SIGNUP:
      return {
        ...state,
        verifying: true
      }
    case types.VERIFYING_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true
      }
    case types.VERIFYING_EMAIL_FAILURE:
      return {
        ...state,
        emailVerified: false,
        errorMessages: {
          ...state.errorMessages,
          email: action.error
        }
      }
    case types.VERIFYING_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordVerified: true
      }
    case types.VERIFYING_PASSWORD_FAILURE:
      return {
        ...state,
        passwordVerified: false,
        errorMessages: {
          ...state.errorMessages,
          password: action.error
        }
      }
    case types.VERIFYING_NAME_SUCCESS:
      return {
        ...state,
        nameVerified: true
      }
    case types.VERIFYING_NAME_FAILURE:
      return {
        ...state,
        nameVerified: false,
        errorMessages: {
          ...state.errorMessages,
          name: action.error
        }
      }
    case types.VERIFYING_USERNAME_SUCCESS:
      return {
        ...state,
        usernameVerified: true
      }
    case types.VERIFYING_USERNAME_FAILURE:
      return {
        ...state,
        usernameVerified: false,
        errorMessages: {
          ...state.errorMessages,
          username: action.error
        }
      }
    case types.VERIFYING_PHONE_SUCCESS:
      return {
        ...state,
        phoneVerified: true
      }
    case types.VERIFYING_PHONE_FAILURE:
      return {
        ...state,
        phoneVerified: false,
        errorMessages: {
          ...state.errorMessages,
          phone: action.error
        }
      }
    case types.VERIFYING_YEAR_SUCCESS:
      return {
        ...state,
        yearVerified: true
      }
    case types.VERIFYING_YEAR_FAILURE:
      return {
        ...state,
        yearVerified: false,
        errorMessages: {
          ...state.errorMessages,
          year: action.error
        }
      }
    case types.VERIFYING_MAJOR_SUCCESS:
      return {
        ...state,
        majorVerified: true
      }
    case types.VERIFYING_MAJOR_FAILURE:
      return {
        ...state,
        majorVerified: false,
        errorMessages: {
          ...state.errorMessages,
          major: action.error
        }
      }
    case types.RESET_FORM:
      return {
        ...initialState,
        signupSuccess: true
      }
    default:
      return state
  }
}

// Actions
export function updateFormFields (payload) {
  return {
    type: types.UPDATE_FORM_FIELDS,
    payload
  }
}

export function verifyingEmailSuccess () {
  return {
    type: types.VERIFYING_EMAIL_SUCCESS
  }
}

export function verifyingEmailFailure ({ error, email }) {
  return {
    type: types.VERIFYING_EMAIL_FAILURE,
    error,
    email
  }
}

export function verifyingPasswordSuccess () {
  return {
    type: types.VERIFYING_PASSWORD_SUCCESS
  }
}

export function verifyingPasswordFailure ({ error, password }) {
  return {
    type: types.VERIFYING_PASSWORD_FAILURE,
    error,
    password
  }
}

export function verifyingNameSuccess () {
  return {
    type: types.VERIFYING_NAME_SUCCESS
  }
}

export function verifyingNameFailure ({ error, name }) {
  return {
    type: types.VERIFYING_NAME_FAILURE,
    error,
    name
  }
}

export function verifyingUsernameSuccess () {
  return {
    type: types.VERIFYING_USERNAME_SUCCESS
  }
}

export function verifyingUsernameFailure ({ error, username }) {
  return {
    type: types.VERIFYING_USERNAME_FAILURE,
    error,
    username
  }
}

export function verifyingPhoneSuccess () {
  return {
    type: types.VERIFYING_PHONE_SUCCESS
  }
}

export function verifyingPhoneFailure ({ error, phone }) {
  return {
    type: types.VERIFYING_PHONE_FAILURE,
    error,
    phone
  }
}

export function verifyingYearSuccess () {
  return {
    type: types.VERIFYING_YEAR_SUCCESS
  }
}

export function verifyingYearFailure ({ error, year }) {
  return {
    type: types.VERIFYING_YEAR_FAILURE,
    error,
    year
  }
}

export function verifyingMajorSuccess () {
  return {
    type: types.VERIFYING_MAJOR_SUCCESS
  }
}

export function verifyingMajorFailure ({ error, major }) {
  return {
    type: types.VERIFYING_MAJOR_FAILURE,
    error,
    major
  }
}

export function signupSuccess () {
  return {
    type: types.SIGNUP_SUCCESS
  }
}

export function signupFailure ({ signupError, signupErrorCode }) {
  return {
    type: types.SIGNUP_FAILURE,
    signupError,
    signupErrorCode
  }
}

export function resetForm () {
  return {
    type: types.RESET_FORM
  }
}

// Getters
export function getErrorMessages (store) {
  return store.errorMessages
}

export function getVerifying (store) {
  return store.verifying
}

export function getSuccess (store) {
  return store.signupSuccess
}

export function getFormValues (store) {
  return store.values
}
