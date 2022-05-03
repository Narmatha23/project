import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import errorReducer from './errorReducer';
import errorReducerHelper from './errorReducerHelper';

import studentReducer from './studentReducer';


export default combineReducers({
    admin: adminReducer,
     student: studentReducer,
    error: errorReducer,
    errorHelper: errorReducerHelper
});