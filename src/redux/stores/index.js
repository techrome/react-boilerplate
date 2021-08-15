import { combineReducers } from 'redux';
import alerts from './alerts';
import data from './data';
import modal from './modal';

export default combineReducers({
  alerts,
  data,
  modal,
});
