// @flow
import { Observable, Action } from 'rxjs';
import { push } from 'react-router-redux'
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

export const HANDLE_ERROR = 'cocheck/list/HANDLE_ERROR';

export const ADD_ITEM = 'cocheck/list/ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'cocheck/list/ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'cocheck/list/ADD_ITEM_FAILURE';

export const SORT_ITEMS = 'cocheck/list/SORT_ITEMS';
export const SORT_ITEMS_SUCCESS = 'cocheck/list/SORT_ITEMS_SUCCESS';
export const SORT_ITEMS_FAILURE = 'cocheck/list/SORT_ITEMS_FAILURE';

// export const EDIT_ITEM = 'cocheck/list/EDIT_ITEM';
// export const CHECK_ITEM = 'cocheck/list/CHECK_ITEM';
// export const UNCHECK_ITEM = 'cocheck/list/UNCHECK_ITEM';
// export const REMOVE_ITEM = 'cocheck/list/REMOVE_ITEM';

// export const CHECK_ALL = 'cocheck/list/CHECK_ALL';
// export const UNCHECK_ALL = 'cocheck/list/UNCHECK_ALL';

export const createList = (name: string): ThunkAction => ({
  type: CREATE_LIST,
  payload: {
    name,
  },
});

export const createListSuccess = ({ id, name }: { id: string, name: string }): ThunkAction => ({
  type: CREATE_LIST_SUCCESS,
  payload: {
    id,
    name,
  },
});

export const createListFailure = (): ThunkAction => ({
  type: CREATE_LIST_FAILURE,
  payload: {},
});

export const readList = (id: string): ThunkAction => ({
  type: READ_LIST,
  payload: {
    id,
  },
});

export const readListSuccess = ({ id, name }: { id: string, name: string }): ThunkAction => ({
  type: READ_LIST_SUCCESS,
  payload: {
    id,
    name,
  },
});

export const readListFailure = (): ThunkAction => ({
  type: READ_LIST_FAILURE,
  payload: {},
});

export const readListItemsSuccess = (items: Array<Item>): ThunkAction => ({
    type: READ_LIST_ITEMS_SUCCESS,
    payload: {
      items,
    },
  });

export const deleteList = (id: string): ThunkAction => ({
  type: DELETE_LIST,
  payload: {
    id,
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
  ({ items, listId }: {items: Array<Item>, listId: string} ): ThunkAction => ({
    type: SORT_ITEMS,
    payload: {
      items,
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

// export const editItem = (name: string): ThunkAction => ({
//   type: EDIT_ITEM,
//   payload: {
//     name,
//   },
// });

// export const checkItem = (id: string): ThunkAction => ({
//   type: CHECK_ITEM,
//   payload: {
//     id,
//   },
// });

// export const uncheckItem = (id: string): ThunkAction => ({
//   type: UNCHECK_ITEM,
//   payload: {
//     id,
//   },
// });

// export const removeItem = (id: string): ThunkAction => ({
//   type: REMOVE_ITEM,
//   payload: {
//     id,
//   },
// });

// export const checkAll = (): ThunkAction => ({
//   type: CHECK_ALL,
//   payload: {},
// });

// export const uncheckAll = (): ThunkAction => ({
//   type: UNCHECK_ALL,
//   payload: {},
// });

export const handleError = (error: Object): ThunkAction => ({
  type: HANDLE_ERROR,
  payload: error,
});

export const createListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(CREATE_LIST)
      .flatMap(action => {
        const listsRef = database.ref('/lists');
        const list = listsRef.push({
          name: action.payload.name,
          created: new Date().toISOString(),
        });
        const id = list.ref.key;

        return Observable.concat(
          Observable.of(createListSuccess({
            id,
            name: action.payload.name,
          })),
          Observable.of(push(`/list/${id}`))
        );
      })
      .catch(error => Observable.of(handleError(error)));

export const readListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(READ_LIST)
      .flatMap(action => {
        const listRef = database.ref('/lists').child(action.payload.id);

        return Observable.fromPromise(listRef.once('value'));
      })
      .flatMap(listRef => {
        const list = listRef.val();

        const listExists = list !== null;

        return listExists
          ? Observable.of(readListSuccess({
              id: listRef.key,
              name: list.name,
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
      })
      .catch(error => Observable.of(handleError(error)));

export const deleteListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(DELETE_LIST)
      .flatMap(action => {
        database.ref('/lists').child(action.payload.id).remove();

        return Observable.of(hideConfirmation());
      })
      .catch(error => Observable.of(handleError(error)));

export const deleteListSuccessEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(DELETE_LIST_SUCCESS)
      .flatMap(() => Observable.concat(
        Observable.of(showNotification({
          title: 'OK',
          body: 'List deleted',
          icon: 'trash',
          type: 'success',
        })),
        Observable.of(push('/'))
      ))
      .catch(error => Observable.of(handleError(error)));

export const addItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(ADD_ITEM)
    .flatMap(action => {
      const { name, index, listId } = action.payload;

      const itemsRef = database.ref(`/items/${listId}`);
      itemsRef.push({
        name,
        index,
      });

      return Observable.of(addItemSuccess());
    })
    .catch(error => Observable.of(handleError(error)));

export const sortItemsEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.ofType(SORT_ITEMS)
    .flatMap(action => {
      const { items, listId } = action.payload;

      const updates = {};

      items.forEach(item => {
        updates[item.id] = {
          index: item.index,
          name: item.name,
        };
      });

      database.ref(`/items/${listId}`).update(updates);
      return Observable.of(sortItemsSuccess());
    })
    .catch(error => Observable.of(handleError(error)));

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
  id: '',
  name: '',
  items: [],
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
    case SORT_ITEMS:
    case DELETE_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_LIST_SUCCESS:
    case READ_LIST_SUCCESS:
      return {
        ...initialState,
        id: action.payload.id,
        name: action.payload.name,
      };
    case READ_LIST_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
      };
    case DELETE_LIST_SUCCESS:
    case CREATE_LIST_FAILURE:
    case READ_LIST_FAILURE:
    case HANDLE_ERROR:
      return initialState;
    case ADD_ITEM_SUCCESS:
    case ADD_ITEM_FAILURE:
    case SORT_ITEMS_SUCCESS:
    case SORT_ITEMS_FAILURE:
    case DELETE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
