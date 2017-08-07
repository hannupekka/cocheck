// @flow
import { createSelector } from 'reselect';

const getItems = (state: RootState): Object => state.list.entities.items;

export default createSelector(
  [getItems],
  (items): Object => items
);
