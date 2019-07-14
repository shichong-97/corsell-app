const initialState = {
  loading: false,
  loggedIn: false,
  user: null,
  success: false,
  error: null
};

export const types = {
  SYNC_USER: "auth: sync user",
  SYNC_USER_SUCCESS: "auth: sync user success",
  SYNC_USER_ERROR: "auth: sync user error",
  LOGIN: "auth: login",
  LOGIN_SUCCESS: "auth: login success",
  LOGIN_ERROR: "auth: login error",
  LOGOUT: "auth: logout",
  LOGOUT_SUCCESS: "auth: logout success",
  LOGOUT_ERROR: "auth: logout error"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SYNC_USER:
    case types.LOGIN:
    case types.LOGOUT:
      return {
        ...initialState,
        loading: true,
        success: false,
        error: null
      };

    case types.SYNC_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        loggedIn: action.loggedIn,
        user: action.user,
        success: true,
        error: null
      };

    case types.LOGIN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        loggedIn: true,
        user: action.user,
        success: true,
        error: null
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        loggedIn: false,
        user: null,
        success: true,
        error: null
      };

    case types.SYNC_USER_ERROR:
    case types.LOGIN_ERROR:
    case types.LOGOUT_ERROR:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.error
      };

    default:
      return state;
  }
}
