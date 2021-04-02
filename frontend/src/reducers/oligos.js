import _ from 'lodash';
import {
  EDIT_OLIGO, GET_OLIGOS, GET_OLIGO, ADD_OLIGO
} from '../actions/types';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case GET_OLIGOS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    case GET_OLIGO:
    case ADD_OLIGO:
    case EDIT_OLIGO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};