// @flow
import database from 'utils/database';
import { deleteListSuccess, readListItemsSuccess, renameListSuccess } from 'redux/list';

export const bindWatchers = (listId: string, dispatch: Function): void => {
  let initialLoadDone = false;

  // Initial load.
  database.ref(`/lists/${listId}`).once('value', listRef => {
    if (listRef.val() !== null) {
      initialLoadDone = true;
    }
  });

  // List removed.
  database.ref(`/lists/${listId}`).on('value', listRef => {
    if (initialLoadDone && listRef.val() === null) {
      dispatch(deleteListSuccess());
    }
  });

  // List renamed.
  database.ref(`/lists/${listId}/name`).on('value', nameRef => {
    if (initialLoadDone && nameRef.val() !== null) {
      dispatch(renameListSuccess(nameRef.val()));
    }
  });

  // List item updates.
  database.ref(`/items/${listId}`).orderByChild('index').on('value', itemsRef => {
    const items = [];
    itemsRef.forEach(item => {
      items.push({
        ...item.val(),
        id: item.key,
      });
    });

    dispatch(readListItemsSuccess(items));
  });
};

export const removeWatchers = (listId: string) => {
  database.ref(`/lists/${listId}`).off();
  database.ref(`/lists/${listId}/name`).off();
  database.ref(`/items/${listId}`).off();
};
