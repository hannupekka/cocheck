// @flow
import cuid from 'cuid';

export const CREATE_LIST = 'cocheck/list/CREATE_LIST';
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

export const initialState: ListState = {
  isLoading: false,
  isError: false,
  id: '',
  entities: {
    items: {},
  },
  result: [],
};

export default function reducer(state: ListState = initialState, action: ThunkAction): ListState {
  switch (action.type) {
    default:
      return state;
  }
};
