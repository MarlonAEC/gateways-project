import { combineReducers } from 'redux';
import list from './list';
import show from './show';
import del from './delete';
import create from './create';

export default combineReducers({list, show, del, create});