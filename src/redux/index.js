// @flow
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  router: routerReducer
});

export const rootEpic = combineEpics();
