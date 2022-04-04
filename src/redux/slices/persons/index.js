// redux
import { combineReducers } from 'redux';
// person slice
import customers from './customers';
import providers from './providers';
import employees from './employees';

export default combineReducers({
  customers,
  providers,
  employees
});
