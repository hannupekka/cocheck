// @flow
import R from 'ramda';
import { normalize } from 'normalizr';
import database from 'utils/database';
import { deleteListSuccess, readListItemsSuccess } from 'redux/list';
import * as Schemas from 'redux/list/schemas';

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

  database.ref('/items').orderByChild('listId').equalTo(id).on('value', itemsRef => {
    const items = R.mapObjIndexed(
      (item, key) => ({
        ...item,
        id: key,
      }),
      itemsRef.val()
    );

    const { entities, result } = normalize(items, Schemas.items);

    dispatch(
      readListItemsSuccess({
        entities: Object.keys(items).length > 0 ? entities : { items: {} },
        result,
      })
    );
  });
};

export const removeWatchers = () => {
  database.ref('/lists').off();
  database.ref('/items').off();
};
