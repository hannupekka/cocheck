// @flow
import { createSelector } from 'reselect';

const getListItems = (state: RootState): Array<Item> => state.list.listItems;
const getListFilter = (state: RootState): ListFilter => state.list.listFilter;

export default createSelector(
  [getListItems, getListFilter],
  (listItems, listFilter): Array<Item> => {
    if (listFilter === 'checked') {
      return listItems.filter(item => item.checked);
    } else if (listFilter === 'unchecked') {
      return listItems.filter(item => !item.checked);
    }

    return listItems;
  }
);
