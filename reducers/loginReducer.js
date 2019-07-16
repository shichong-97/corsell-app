export const initialState = {
  verifying: false,
  values: {
    email: '',
    password: ''
  },
  emailVerified: false,
  passwordVerified: false,

  errorMessages: {
    email: '',
    password: ''
  },

  loginError: null,
  loginSuccess: false,
  loginFailure: false
}

// Types
export const types = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  VERIFYING_LOGIN: 'VERIFYING_LOGIN',
  VERIFYING_EMAIL_SUCCESS: 'VERIFYING_EMAIL_SUCCESS',
  VERIFYING_EMAIL_FAILURE: 'VERIFYING_EMAIL_FAILURE',
  VERIFYING_PASSWORD_SUCCESS: 'VERIFYING_PASSWORD_SUCCESS',
  VERIFYING_PASSWORD_FAILURE: 'VERIFYING_PASSWORD_FAILURE',
  UPDATE_LOGIN_FIELDS: 'UPDATE_LOGIN_FIELDS',
  RESET_LOGIN_FORM: 'RESET_LOGIN_FORM'
}

// Reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LOGIN_FIELDS:
      const event = action.payload
      return {
        ...initialState,
        errorMessages: {
          email: '',
          password: ''
        },
        values: {
          email: event.email,
          password: event.password
        }
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        verifying: false,
        loginSuccess: true,
        loginFailure: false
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        verifying: false,
        loginSuccess: false,
        loginFailure: true
      }
    case types.VERIFYING_LOGIN:
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
    case types.RESET_LOGIN_FORM:
      return {
        ...initialState,
        loginSuccess: true
      }
    default:
      return state
  }
}

// Actions
export function updateLoginForm (payload) {
  return {
    type: types.UPDATE_LOGIN_FIELDS,
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

export function loginSuccess () {
  return {
    type: types.LOGIN_SUCCESS
  }
}

export function loginFailure ({ loginError }) {
  return {
    type: types.LOGIN_FAILURE,
    loginError
  }
}

export function resetLoginForm () {
  return {
    type: types.RESET_LOGIN_FORM
  }
}

// Getters
export function getErrorMessages (store) {
  console.log(store, 'store')
  return store.errorMessages
}

export function getVerifying (store) {
  return store.verifying
}

export function getLoginSuccess (store) {
  return store.loginSuccess
}

export function getFormValues (store) {
  return store.values
}
