import _ from 'lodash';
import {
  EDIT_OLIGO, GET_OLIGOS, GET_OLIGO, ADD_OLIGO, DELETE_OLIGO, BAD_REQUEST
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
        [action.payload.id]: action.payload
      };
    case DELETE_OLIGO:
      return _.omit(state, action.payload);
    case BAD_REQUEST:
      return {
        ...state,
        error: true,
      }
    default:
      return state;
  }
};