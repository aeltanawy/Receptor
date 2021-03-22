import axios from 'axios';
import { tokenConfig } from './auth';
import { reset } from 'redux-form';

import history from '../history';
import {
  GET_OLIGOS,
  GET_OLIGO,
  ADD_OLIGO,
  DELETE_OLIGO,
  EDIT_OLIGO
} from './types';


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
    const res = await axios.post(
        'oligos/oligos/',
        { ...formValues },
        tokenConfig(getState)
    );
    dispatch({
        type: ADD_OLIGO,
        payload: res.data
    });
    dispatch(reset('oligoForm'));
};

// delete oligo
export const deleteOligo = id => async (dispatch, getState) => {
    const res = await axios.delete(
        `oligos/oligos/${id}`,
        tokenConfig(getState)
    );
    dispatch({
        type: DELETE_OLIGO,
        payload: res.data
    });
    history.push('/'); //to take us to home page after removing an object
};

// edit oligo
export const editOligo = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(
        `oligos/oligos/${id}`,
        formValues,
        tokenConfig(getState)
    );
    dispatch({
        type: EDIT_OLIGO,
        payload: res.data
    });
    history.push('/'); //to take us to homepage after removing an object
};

