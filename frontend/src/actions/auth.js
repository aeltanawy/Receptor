//adapted from https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c

import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from './types';


// load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get('/api/auth/user', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// login user
export const login = ({ username, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify( {username, password });

  try {
    const res = await axios.post('api/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    dispatch(stopSubmit('loginForm', err.response.data));
  }
};

// helper function
export const tokenConfig = getState => {
  // get token
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
}

// logout user
export const logout = () => async (dispatch, getState) => {
  await axios.post('/api/auth/logout', null, tokenConfig(getState));
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

// register user
export const register = ({ username, email, password }) => async dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //request body
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post('/api/auth/register', body, config);
    dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data
  });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    dispatch(stopSubmit('registerForm', err.response.data))
  }
 }