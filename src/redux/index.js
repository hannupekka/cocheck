// @flow
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import confirm from 'redux/confirm';
import notification from 'redux/notification';
import list, {
  createListEpic,
  readListEpic,
  deleteListEpic,
  deleteListSuccessEpic,
  addItemEpic,
  editItemEpic,
  sortItemsEpic,
  handleErrorEpic,
} from 'redux/list';

export const rootReducer = combineReducers({
  confirm,
  notification,
  list,
  router: routerReducer,
});

export const rootEpic = combineEpics(
  createListEpic,
  readListEpic,
  deleteListEpic,
  deleteListSuccessEpic,
  addItemEpic,
  editItemEpic,
  sortItemsEpic,
  handleErrorEpic
);
