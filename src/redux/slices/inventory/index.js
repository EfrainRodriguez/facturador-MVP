// redux
import { combineReducers } from 'redux';
// inventory slice
import products from './products';
import categories from './categories';
import units from './units';

export default combineReducers({
  products,
  categories,
  units
});
