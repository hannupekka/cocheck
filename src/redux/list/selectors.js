// @flow
import { createSelector } from 'reselect';

const getItems = (state: RootState): Array<Item> => state.list.listItems;

export default createSelector(
  [getItems],
  (items): Array<Item> => items
);
