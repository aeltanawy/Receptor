// import { getOligos } from '../actions/oligos';
import auth from './auth';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import oligos from './oligos';
import { LOGOUT_SUCCESS } from '../actions/types';


const appReducer = combineReducers({
    form: formReducer,
    oligos,
    auth
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;