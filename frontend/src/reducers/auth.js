//adapted from https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../actions/types';


const initialState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
  token: localStorage.getItem('token'),
  error: null, //TODO: check if needed
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //tokens are stored in a web browser using the localStorage property that has no expiration date & is a read-only
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        ...action.payload
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: true,
      };
    default:
      return state;
  }
}

export default reducer;