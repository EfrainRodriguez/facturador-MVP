// redux
import { combineReducers } from 'redux';
// inventory slice
import products from './products';
import categories from './categories';

export default combineReducers({
  products,
  categories
});
