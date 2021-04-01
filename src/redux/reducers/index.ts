import { combineReducers } from 'redux';
import systemReducer from './system';
import studentReducer from './student';

const rootReducers = combineReducers({
  student: studentReducer,
  system: systemReducer,
});

export default rootReducers;
