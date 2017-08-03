// @flow
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import confirm from 'redux/confirm';
import list, { createListEpic } from 'redux/list';

export const rootReducer = combineReducers({
  confirm,
  list,
  router: routerReducer,
});

export const rootEpic = combineEpics(createListEpic);
