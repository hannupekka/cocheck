// @flow
import database from 'utils/database';
import { deleteListSuccess, readListItemsSuccess, renameListSuccess } from 'redux/list';

export const bindWatchers = (listId: string, dispatch: Function): void => {
  // List removed.
  database.ref(`/lists/${listId}`).on('value', listRef => {
    if (listRef.val() === null) {
      dispatch(deleteListSuccess());
    }
  });

  // List renamed.
  database.ref(`/lists/${listId}/name`).on('value', nameRef => {
    if (nameRef.val() !== null) {
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

export const removeWatchers = () => {
  database.ref('/lists').off();
  database.ref('/items').off();
};
