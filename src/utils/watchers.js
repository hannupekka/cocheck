// @flow
import database from 'utils/database';
import { deleteListSuccess, readListItemsSuccess, renameListSuccess } from 'redux/list';

export const bindWatchers = (listId: string, dispatch: Function): void => {
  database.ref(`/lists/${listId}/name`).on('value', nameRef => {
    dispatch(renameListSuccess(nameRef.val()));
  });

  database.ref('/lists').orderByKey().equalTo(listId).on('child_removed', () => {
    dispatch(deleteListSuccess());

    database.ref('/items').orderByChild('listId').equalTo(listId).once('value', itemsRef => {
      const items = itemsRef.val();

      if (items !== null) {
        const updates = {};
        Object.keys(items.val()).forEach(key => {
          updates[key] = null;
        });

        itemsRef.update(updates);
      }
    });
  });

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
