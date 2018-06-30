// @flow
import { Observable, Action } from 'rxjs';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import database from 'utils/database';
import { hideConfirmation } from 'redux/confirm';
import { showNotification } from 'redux/notification';

export const CREATE_LIST = 'cocheck/list/CREATE_LIST';
export const CREATE_LIST_SUCCESS = 'cocheck/list/CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'cocheck/list/CREATE_LIST_FAILURE';

export const READ_LIST = 'cocheck/list/READ_LIST';
export const READ_LIST_SUCCESS = 'cocheck/list/READ_LIST_SUCCESS';
export const READ_LIST_FAILURE = 'cocheck/list/READ_LIST_FAILURE';
export const READ_LIST_ITEMS_SUCCESS = 'cocheck/list/READ_LIST_ITEMS_SUCCESS';

export const DELETE_LIST = 'cocheck/list/DELETE_LIST';
export const DELETE_LIST_SUCCESS = 'cocheck/list/DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'cocheck/list/DELETE_LIST_FAILURE';

export const RENAME_LIST = 'cocheck/list/RENAME_LIST';
export const RENAME_LIST_SUCCESS = 'cocheck/list/RENAME_LIST_SUCCESS';
export const RENAME_LIST_FAILURE = 'cocheck/list/RENAME_LIST_FAILURE';

export const HANDLE_ERROR = 'cocheck/list/HANDLE_ERROR';

export const ADD_ITEM = 'cocheck/list/ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'cocheck/list/ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'cocheck/list/ADD_ITEM_FAILURE';

export const SORT_ITEMS = 'cocheck/list/SORT_ITEMS';
export const SORT_ITEMS_SUCCESS = 'cocheck/list/SORT_ITEMS_SUCCESS';
export const SORT_ITEMS_FAILURE = 'cocheck/list/SORT_ITEMS_FAILURE';

export const EDIT_ITEM = 'cocheck/list/EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'cocheck/list/EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAILURE = 'cocheck/list/EDIT_ITEM_FAILURE';

export const TOGGLE_ITEM = 'cocheck/list/TOGGLE_ITEM';
export const TOGGLE_ITEM_SUCCESS = 'cocheck/list/TOGGLE_ITEM_SUCCESS';
export const TOGGLE_ITEM_FAILURE = 'cocheck/list/TOGGLE_ITEM_FAILURE';

export const REMOVE_ITEM = 'cocheck/list/REMOVE_ITEM';
export const REMOVE_ITEM_SUCCESS = 'cocheck/list/REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'cocheck/list/REMOVE_ITEM_FAILURE';

export const TOGGLE_ALL_ITEMS = 'cocheck/list/TOGGLE_ALL_ITEMS';
export const TOGGLE_ALL_ITEMS_SUCCESS = 'cocheck/list/TOGGLE_ALL_ITEMS_SUCCESS';
export const TOGGLE_ALL_ITEMS_FAILURE = 'cocheck/list/TOGGLE_ALL_ITEMS_FAILURE';

export const SET_LIST_FILTER = 'cocheck/list/SET_LIST_FILTER';

export const createList = (listName: string): ThunkAction => ({
  type: CREATE_LIST,
  payload: {
    listName,
  },
});

export const createListSuccess =
  ({ listId, listName }: { listId: string, listName: string }): ThunkAction => ({
    type: CREATE_LIST_SUCCESS,
    payload: {
      listId,
      listName,
    },
  });

export const createListFailure = (): ThunkAction => ({
  type: CREATE_LIST_FAILURE,
  payload: {},
});

export const readList = (listId: string): ThunkAction => ({
  type: READ_LIST,
  payload: {
    listId,
  },
});

export const readListSuccess =
  ({ listId, listName }: { listId: string, listName: string }): ThunkAction => ({
    type: READ_LIST_SUCCESS,
    payload: {
      listId,
      listName,
    },
  });

export const readListFailure = (): ThunkAction => ({
  type: READ_LIST_FAILURE,
  payload: {},
});

export const readListItemsSuccess = (listItems: Array<Item>): ThunkAction => ({
    type: READ_LIST_ITEMS_SUCCESS,
    payload: {
      listItems,
    },
  });

export const deleteList = (listId: string): ThunkAction => ({
  type: DELETE_LIST,
  payload: {
    listId,
  },
});

export const deleteListSuccess = (): ThunkAction => ({
  type: DELETE_LIST_SUCCESS,
  payload: {},
});

export const deleteListFailure = (): ThunkAction => ({
  type: DELETE_LIST_FAILURE,
  payload: {},
});

export const renameList =
  ({ listName, listId }: { listName: ?string, listId: string }): ThunkAction => ({
    type: RENAME_LIST,
    payload: {
      listName,
      listId,
    },
  });

export const renameListSuccess = (listName: ?string): ThunkAction => ({
  type: RENAME_LIST_SUCCESS,
  payload: {
    listName,
  },
});

export const renameListFailure = (): ThunkAction => ({
  type: RENAME_LIST_FAILURE,
  payload: {},
});

export const addItem =
  ({ name, index, listId }: { name: string, index: number, listId: string }): ThunkAction => ({
    type: ADD_ITEM,
    payload: {
      name,
      index,
      listId,
    },
  });

export const addItemSuccess = (): ThunkAction => ({
  type: ADD_ITEM_SUCCESS,
  payload: {},
});

export const addItemFailure = (): ThunkAction => ({
  type: ADD_ITEM_FAILURE,
  payload: {},
});

export const sortItems =
  ({ listItems, listId }: { listItems: Array<Item>, listId: string }): ThunkAction => ({
    type: SORT_ITEMS,
    payload: {
      listItems,
      listId,
    },
  });

export const sortItemsSuccess = (): ThunkAction => ({
  type: SORT_ITEMS_SUCCESS,
  payload: {},
});

export const sortItemsFailure = (): ThunkAction => ({
  type: SORT_ITEMS_FAILURE,
  payload: {},
});

export const editItem =
  ({ name, itemId, listId }: { name: string, itemId: string, listId: string }): ThunkAction => ({
    type: EDIT_ITEM,
    payload: {
      name,
      itemId,
      listId,
    },
  });

export const editItemSuccess = (): ThunkAction => ({
  type: EDIT_ITEM_SUCCESS,
  payload: {},
});

export const editItemFailure = (): ThunkAction => ({
  type: EDIT_ITEM_FAILURE,
  payload: {},
});

export const toggleItem =
  ({ checked, itemId, listId }: { checked: boolean, itemId: string, listId: string}): ThunkAction =>
    ({
      type: TOGGLE_ITEM,
      payload: {
        checked,
        itemId,
        listId,
      },
    });

export const toggleItemSuccess = (): ThunkAction => ({
  type: TOGGLE_ITEM_SUCCESS,
  payload: {},
});

export const toggleItemFailure = (): ThunkAction => ({
  type: TOGGLE_ITEM_FAILURE,
  payload: {},
});

export const removeItem = ({ itemId, listId }: { itemId: string, listId: string}): ThunkAction => ({
  type: REMOVE_ITEM,
  payload: {
    itemId,
    listId,
  },
});

export const removeItemSuccess = (): ThunkAction => ({
  type: REMOVE_ITEM_SUCCESS,
  payload: {},
});

export const removeItemFailure = (): ThunkAction => ({
  type: REMOVE_ITEM_FAILURE,
  payload: {},
});

export const toggleAllItems =
  // eslint-disable-next-line max-len
  ({ checked, listId, listItems }: { checked: boolean, listId: string, listItems: Array<Item> }): ThunkAction => ({
    type: TOGGLE_ALL_ITEMS,
    payload: {
      checked,
      listId,
      listItems,
    },
  });

export const toggleAllItemsSuccess = (): ThunkAction => ({
  type: TOGGLE_ALL_ITEMS_SUCCESS,
  payload: {},
});

export const toggleAllItemsFailure = (): ThunkAction => ({
  type: TOGGLE_ALL_ITEMS_FAILURE,
  payload: {},
});

export const setListFilter = (listFilter: ListFilter): ThunkAction => ({
  type: SET_LIST_FILTER,
  payload: {
    listFilter,
  },
});

export const handleError = (error: Object): ThunkAction => ({
  type: HANDLE_ERROR,
  payload: error,
});

export const createListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(CREATE_LIST)
      .flatMap(action => {
        const listsRef = database.ref('/lists');

        try {
          const list = listsRef.push({
            name: action.payload.listName,
            created: new Date().toISOString(),
          });
          const listId = list.ref.key;
          const listName = action.payload.name;

          return Observable.concat(
            Observable.of(createListSuccess({
              listId,
              listName,
            })),
            Observable.of(push(`/list/${listId}`))
          );
        } catch (e) {
          return Observable.concat(
            Observable.of(createListFailure()),
            Observable.of(showNotification({
              title: 'Error',
              body: 'Could not create list',
              icon: 'exclamation',
              type: 'error',
            }))
          );
        }
      });

export const readListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(READ_LIST)
      .flatMap(action => {
        const listRef = database.ref('/lists').child(action.payload.listId);

        return Observable.fromPromise(listRef.once('value'));
      })
      .flatMap(listRef => {
        const list = listRef.val();

        const listExists = list !== null;

        return listExists
          ? Observable.of(readListSuccess({
              listId: listRef.key,
              listName: list.name,
            }))
          : Observable.concat(
              Observable.of(readListFailure()),
              Observable.of(push('/')),
              Observable.of(showNotification({
                title: 'Error',
                body: 'List not found',
                icon: 'exclamation',
                type: 'error',
              }))
          );
      });

export const deleteListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(DELETE_LIST)
      .flatMap(action => {
        const listRef = database.ref('/lists').child(action.payload.listId);
        listRef.remove();

        return Observable.fromPromise(
          listRef.once('value')
        );
      })
      .flatMap(listRef => listRef.val() === null
        ? Observable.of(hideConfirmation())
        : Observable.concat(
            Observable.of(hideConfirmation()),
            Observable.of(deleteListFailure()),
            Observable.of(showNotification({
              title: 'Error',
              body: 'Could not delete list',
              icon: 'exclamation',
              type: 'error',
            }))
          )
      );

export const deleteListSuccessEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(DELETE_LIST_SUCCESS)
      .flatMap(() => Observable.concat(
        Observable.of(showNotification({
          title: 'OK',
          body: 'List deleted',
          icon: 'trash-o',
          type: 'success',
        })),
        Observable.of(push('/'))
      ));

export const renameListEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(RENAME_LIST)
    .flatMap(action => {
      const { listName, listId } = action.payload;

      try {
        database.ref(`/lists/${listId}`).set({ name: listName });

        return Observable.of();
      } catch (e) {
        return Observable.concat(
          Observable.of(renameListFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: 'Could not rename list',
            icon: 'exclamation',
            type: 'error',
          }))
        );
      }
    });

export const addItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(ADD_ITEM)
    .flatMap(action => {
      const { name, index, listId } = action.payload;
      const itemsRef = database.ref(`/items/${listId}`);

      try {
        itemsRef.push({
          name,
          index,
          checked: false,
        });

        return Observable.of(addItemSuccess());
      } catch (e) {
        return Observable.concat(
          Observable.of(addItemFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: 'Could not add item',
            icon: 'exclamation',
            type: 'error',
          }))
        );
      }
    });

export const editItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(EDIT_ITEM)
    .flatMap(action => {
      const { name, itemId, listId} = action.payload;
      const itemRef = database.ref(`/items/${listId}/${itemId}`);

      try {
        itemRef.update({ name });

        return Observable.of(editItemSuccess());
      } catch (e) {
        return Observable.concat(
          Observable.of(editItemFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: 'Could not edit item',
            icon: 'exclamation',
            type: 'error',
          }))
        );
      }
    });

export const removeItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(REMOVE_ITEM)
    .flatMap(action => {
      const { itemId, listId } = action.payload;
      const itemRef = database.ref(`/items/${listId}/${itemId}`);

      try {
        itemRef.remove();

        return Observable.concat(
          Observable.of(removeItemSuccess()),
          Observable.of(hideConfirmation())
        );
      } catch (e) {
        return Observable.concat(
          Observable.of(hideConfirmation()),
          Observable.of(removeItemFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: 'Could not remove item',
            icon: 'exclamation',
            type: 'error',
          }))
        );
      }
    });

export const toggleItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(TOGGLE_ITEM)
    .flatMap(action => {
      const { checked, itemId, listId } = action.payload;
      const itemRef = database.ref(`/items/${listId}/${itemId}`);

      const op = checked ? 'uncheck' : 'check';

      try {
        itemRef.update({ checked: !checked });

        return Observable.of(toggleItemSuccess());
      } catch (e) {
        return Observable.concat(
          Observable.of(toggleItemFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: `Could not ${op} item`,
            icon: 'exclamation',
            type: 'error',
          }))
        );
      }
    });

export const sortItemsEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(SORT_ITEMS)
    .flatMap(action => {
      const { listItems, listId } = action.payload;

      const updates = {};

      listItems.forEach(item => {
        updates[item.id] = {
          index: item.index,
          name: item.name,
          checked: item.checked,
        };
      });

      try {
        database.ref(`/items/${listId}`).update(updates);
        return Observable.of(sortItemsSuccess());
      } catch (e) {
        return Observable.concat(
          Observable.of(sortItemsFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: 'Could not sort items',
            icon: 'exclamation',
            type: 'error',
          })),
        );
      }
    });

export const toggleAllItemsEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(TOGGLE_ALL_ITEMS)
    .flatMap(action => {
      const { checked, listId, listItems } = action.payload;
      const op = checked ? 'check' : 'uncheck';

      const updates = {};

      listItems.forEach(item => {
        updates[item.id] = {
          index: item.index,
          name: item.name,
          checked,
        };
      });

      try {
        database.ref(`/items/${listId}`).update(updates);
        return Observable.concat(
          Observable.of(hideConfirmation()),
          Observable.of(toggleAllItemsSuccess())
        );
      } catch (e) {
        return Observable.concat(
          Observable.of(toggleAllItemsFailure()),
          Observable.of(showNotification({
            title: 'Error',
            body: `Could not ${op} items`,
            icon: 'exclamation',
            type: 'error',
          })),
        );
      }
    });

export const handleErrorEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(HANDLE_ERROR)
      .flatMap(action => {
        // eslint-disable-next-line
        console.error(action.payload.message);
        return Observable.of(push('/'));
      });

export const initialState: ListState = {
  isLoading: false,
  listId: '',
  listName: '',
  listItems: [],
  listFilter: 'all',
};

export default function reducer(state: ListState = initialState, action: ThunkAction): ListState {
  switch (action.type) {
    case CREATE_LIST:
    case READ_LIST:
      return {
        ...initialState,
        isLoading: true,
      };
    case ADD_ITEM:
    case EDIT_ITEM:
    case TOGGLE_ITEM:
    case TOGGLE_ALL_ITEMS:
    case REMOVE_ITEM:
    case SORT_ITEMS:
    case DELETE_LIST:
    case RENAME_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_LIST_SUCCESS:
      return {
        ...initialState,
        listId: action.payload.listId,
        listName: action.payload.listName,
      };
    case READ_LIST_SUCCESS:
      return {
        ...state,
        listId: action.payload.listId,
        listName: action.payload.listName,
        isLoading: false,
      };
    case READ_LIST_ITEMS_SUCCESS:
      return {
        ...state,
        listItems: action.payload.listItems,
      };
    case DELETE_LIST_SUCCESS:
    case CREATE_LIST_FAILURE:
    case READ_LIST_FAILURE:
    case LOCATION_CHANGE:
    case HANDLE_ERROR:
      return initialState;
    case ADD_ITEM_SUCCESS:
    case ADD_ITEM_FAILURE:
    case EDIT_ITEM_SUCCESS:
    case EDIT_ITEM_FAILURE:
    case TOGGLE_ITEM_SUCCESS:
    case TOGGLE_ITEM_FAILURE:
    case TOGGLE_ALL_ITEMS_SUCCESS:
    case TOGGLE_ALL_ITEMS_FAILURE:
    case REMOVE_ITEM_SUCCESS:
    case REMOVE_ITEM_FAILURE:
    case SORT_ITEMS_SUCCESS:
    case SORT_ITEMS_FAILURE:
    case DELETE_LIST_FAILURE:
    case RENAME_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case RENAME_LIST_SUCCESS:
      return {
        ...state,
        listName: action.payload.listName,
        isLoading: false,
      };
    case SET_LIST_FILTER:
      return {
        ...state,
        listFilter: action.payload.listFilter,
      };
    default:
      return state;
  }
};
