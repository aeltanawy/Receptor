import _ from 'lodash';
import { GET_OLIGOS } from '../actions/types';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case GET_OLIGOS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    default:
      return state;
  }
};