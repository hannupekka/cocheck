// @flow
import database from 'utils/database';
import { deleteListSuccess, readListItemsSuccess } from 'redux/list';

export const bindWatchers = (id: string, dispatch: Function): void => {
  database.ref('/lists').orderByKey().equalTo(id).on('child_removed', () => {
    dispatch(deleteListSuccess());

    const itemsRef = database.ref('/items');
    itemsRef.orderByChild('listId').equalTo(id).once('value', items => {
      const updates = {};
      Object.keys(items.val()).forEach(key => {
        updates[key] = null;
      });

      itemsRef.update(updates);
    });
  });

  database.ref(`/items/${id}`).orderByChild('index').on('value', itemsRef => {
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
