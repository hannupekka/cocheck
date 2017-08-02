// @flow
import { Observable, Action } from 'rxjs';
import cuid from 'cuid';
import { push } from 'react-router-redux'
import database from 'utils/database';

export const CREATE_LIST = 'cocheck/list/CREATE_LIST';
export const CREATE_LIST_SUCCESS = 'cocheck/list/CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'cocheck/list/CREATE_LIST_FAILURE';

export const DELETE_LIST = 'cocheck/list/DELETE_LIST';

export const ADD_ITEM = 'cocheck/list/ADD_ITEM';
export const EDIT_ITEM = 'cocheck/list/EDIT_ITEM';
export const CHECK_ITEM = 'cocheck/list/CHECK_ITEM';
export const UNCHECK_ITEM = 'cocheck/list/UNCHECK_ITEM';
export const REMOVE_ITEM = 'cocheck/list/REMOVE_ITEM';

export const CHECK_ALL = 'cocheck/list/CHECK_ALL';
export const UNCHECK_ALL = 'cocheck/list/UNCHECK_ALL';

export const createList = (): ThunkAction => ({
  type: CREATE_LIST,
  payload: {},
});

export const createListSuccess = (id: string): ThunkAction => ({
  type: CREATE_LIST_SUCCESS,
  payload: {
    id,
  },
});

export const createListFailure = (): ThunkAction => ({
  type: CREATE_LIST_FAILURE,
  payload: {
    errorMessage: 'Could not create new list',
  },
});

export const deleteList = (): ThunkAction => ({
  type: DELETE_LIST,
  payload: {},
});

export const addItem = ({ name, checked }: { name: string, checked: boolean }): ThunkAction => ({
  type: ADD_ITEM,
  payload: {
    id: cuid(),
    name,
    checked,
  },
});

export const editItem = (name: string): ThunkAction => ({
  type: EDIT_ITEM,
  payload: {
    name,
  },
});

export const checkItem = (id: string): ThunkAction => ({
  type: CHECK_ITEM,
  payload: {
    id,
  },
});

export const uncheckItem = (id: string): ThunkAction => ({
  type: UNCHECK_ITEM,
  payload: {
    id,
  },
});

export const removeItem = (id: string): ThunkAction => ({
  type: REMOVE_ITEM,
  payload: {
    id,
  },
});

export const checkAll = (): ThunkAction => ({
  type: CHECK_ALL,
  payload: {},
});

export const uncheckAll = (): ThunkAction => ({
  type: UNCHECK_ALL,
  payload: {},
});

export const createListEpic =
  (action$: Observable<Action>): Observable<Action> =>
    action$.ofType(CREATE_LIST)
      .flatMap(() => {
        const listsRef = database.ref('/lists');
        const list = listsRef.push({ created: new Date().toISOString() });
        const id = list.ref.key;

        return Observable.concat(
          Observable.of(createListSuccess(id)),
          Observable.of(push(`/list/${id}`))
        );
      })
      .catch(() => Observable.of(createListFailure()));

export const initialState: ListState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  id: '',
  entities: {
    items: {},
  },
  result: [],
};

export default function reducer(state: ListState = initialState, action: ThunkAction): ListState {
  switch (action.type) {
    case CREATE_LIST:
      return {
        ...initialState,
        isLoading: true,
      };
    case CREATE_LIST_SUCCESS:
      return {
        ...initialState,
        id: action.payload.id,
      };
    case CREATE_LIST_FAILURE:
      return {
        ...initialState,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
