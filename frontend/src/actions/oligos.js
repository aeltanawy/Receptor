import axios from 'axios';
import { tokenConfig } from './auth';
import { reset, stopSubmit } from 'redux-form';

import {
  GET_OLIGOS,
  GET_OLIGO,
  ADD_OLIGO,
  DELETE_OLIGO,
  EDIT_OLIGO,
  BAD_REQUEST
} from './types';

axios.defaults.baseURL = '/';

// get oligos
export const getOligos = () => async (dispatch, getState) => {
  const res = await axios.get('/oligos/oligos/', tokenConfig(getState));
  dispatch({
    type: GET_OLIGOS,
    payload: res.data
  });
};

// get oligo
export const getOligo = id => async (dispatch, getState) => {
  const res = await axios.get(`/oligos/oligos/${id}`, tokenConfig(getState));
  dispatch({
    type: GET_OLIGO,
    payload: res.data
  });
};

// add oligo
export const addOligo = formValues => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      'oligos/oligos/',
      { ...formValues },
      tokenConfig(getState)
    );
    dispatch({
      type: ADD_OLIGO,
      payload: res.data
    });
    dispatch(reset('createOligo'));
  } catch (err) {
    dispatch({
      type: BAD_REQUEST
    });
    dispatch(stopSubmit('createOligo', err.response.data));
  };
};

// delete oligo
export const deleteOligo = id => async (dispatch, getState) => {
  try {
    await axios.delete(
      `oligos/oligos/${id}/`,
      tokenConfig(getState)
    );
    dispatch({
      type: DELETE_OLIGO,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: BAD_REQUEST
    });
  };
};

// edit oligo
export const editOligo = (id, formValues) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `oligos/oligos/${id}/`,
      formValues,
      tokenConfig(getState),
    );
    dispatch({
      type: EDIT_OLIGO,
      payload: res.data
    });
    dispatch(reset('createOligo'));
  } catch (err) {
    dispatch({
      type: BAD_REQUEST
    });
    dispatch(stopSubmit('createOligo', err.response.data));
  };
};

