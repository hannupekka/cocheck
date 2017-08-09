/* eslint-env jest */
import reducer, * as List from 'redux/list';

// Mock firebase
jest.mock('firebase/app', () => ({
  ...jest.genMockFromModule('firebase/app'),
  database: jest.fn(),
}));

describe('List actions', () => {
  it('should create action to create list', () => {
    const expected = {
      type: List.CREATE_LIST,
      payload: {
        listName: 'list name',
      },
    };

    expect(List.createList('list name')).toEqual(expected);
  });

  it('should create action for list created successfully', () => {
    const expected = {
      type: List.CREATE_LIST_SUCCESS,
      payload: {
        listId: '-foobar',
        listName: 'list name',
      },
    };

    expect(List.createListSuccess({
      listId: '-foobar',
      listName: 'list name',
    })).toEqual(expected);
  });

  it('should create action for list not created successfully', () => {
    const expected = {
      type: List.CREATE_LIST_FAILURE,
      payload: {},
    };

    expect(List.createListFailure()).toEqual(expected);
  });

  it('should create action to read list', () => {
    const expected = {
      type: List.READ_LIST,
      payload: {
        listId: 'foo-123',
      },
    };

    expect(List.readList('foo-123')).toEqual(expected);
  });

  it('should create action for list read successfully', () => {
    const expected = {
      type: List.READ_LIST_SUCCESS,
      payload: {
        listId: 'foo-123',
        listName: 'list name',
      },
    };

    expect(List.readListSuccess({
      listId: 'foo-123',
      listName: 'list name',
    })).toEqual(expected);
  });

  it('should create action for list not read successfully', () => {
    const expected = {
      type: List.READ_LIST_FAILURE,
      payload: {},
    };

    expect(List.readListFailure()).toEqual(expected);
  });

  it('should create action to read list items successfully', () => {
    const listItems = [
      {
        name: 'foo',
        index: 0,
        listId: 'foo123',
      },
      {
        name: 'bar',
        index: 1,
        listId: 'foo123',
      },
    ];

    const expected = {
      type: List.READ_LIST_ITEMS_SUCCESS,
      payload: {
        listItems,
      },
    };

    expect(List.readListItemsSuccess(listItems)).toEqual(expected);
  });

  it('should create action to delete list', () => {
    const expected = {
      type: List.DELETE_LIST,
      payload: {
        listId: 'foo-123',
      },
    };

    expect(List.deleteList('foo-123')).toEqual(expected);
  });

  it('should create action for list deleted successfully', () => {
    const expected = {
      type: List.DELETE_LIST_SUCCESS,
      payload: {},
    };

    expect(List.deleteListSuccess()).toEqual(expected);
  });

  it('should create action for list not deleted successfully', () => {
    const expected = {
      type: List.DELETE_LIST_FAILURE,
      payload: {},
    };

    expect(List.deleteListFailure()).toEqual(expected);
  });

  it('should create action to rename list', () => {
    const expected = {
      type: List.RENAME_LIST,
      payload: {
        listName: 'foo',
        listId: 'foo123',
      },
    };


    expect(List.renameList({ listName: 'foo', listId: 'foo123'})).toEqual(expected);
  });

  it('should create action to rename list successfully', () => {
    const expected = {
      type: List.RENAME_LIST_SUCCESS,
      payload: {
        listName: 'foolist',
      },
    };

    expect(List.renameListSuccess('foolist')).toEqual(expected);
  });

  it('should create action to not rename list successfully', () => {
    const expected = {
      type: List.RENAME_LIST_FAILURE,
      payload: {},
    };

    expect(List.renameListFailure()).toEqual(expected);
  });

  it('should create an action to add item', () => {
    const expected = {
      type: List.ADD_ITEM,
      payload: {
        name: 'foo',
        index: 0,
        listId: 'foo123',
      },
    };

    expect(List.addItem({ name: 'foo', index: 0, listId: 'foo123'})).toEqual(expected);
  });

  it('should create an action for item added successfully', () => {
    const expected = {
      type: List.ADD_ITEM_SUCCESS,
      payload: {},
    };

    expect(List.addItemSuccess()).toEqual(expected);
  });

  it('should create an action for item not added successfully', () => {
    const expected = {
      type: List.ADD_ITEM_FAILURE,
      payload: {},
    };

    expect(List.addItemFailure()).toEqual(expected);
  });

  it('should create an action for editing item', () => {
    const expected = {
      type: List.EDIT_ITEM,
      payload: {
        name: 'foo',
        itemId: 'foo123',
        listId: 'abc123',
      },
    };

    expect(List.editItem({ name: 'foo', itemId: 'foo123', listId: 'abc123' })).toEqual(expected);
  });

  it('should create an action for editing item successfully', () => {
    const expected = {
      type: List.EDIT_ITEM_SUCCESS,
      payload: {},
    };

    expect(List.editItemSuccess()).toEqual(expected);
  });

  it('should create an action for not editing item successfully', () => {
    const expected = {
      type: List.EDIT_ITEM_FAILURE,
      payload: {},
    };

    expect(List.editItemFailure()).toEqual(expected);
  });

  it('should create an action for sorting items', () => {
    const listItems = [
      {
        id: 'foo1',
        name: 'first',
        index: 0,
      }, {
        id: 'foo2',
        name: 'second',
        index: 1,
      },
    ];

    const expected = {
      type: List.SORT_ITEMS,
      payload: {
        listItems,
        listId: 'foo123',
      },
    };

    expect(List.sortItems({ listItems, listId: 'foo123' })).toEqual(expected);
  });

  it('should create an action for successfully sorted items', () => {
    const expected = {
      type: List.SORT_ITEMS_SUCCESS,
      payload: {},
    };

    expect(List.sortItemsSuccess()).toEqual(expected);
  });

  it('should create an action for successfully sorted items', () => {
    const expected = {
      type: List.SORT_ITEMS_FAILURE,
      payload: {},
    };

    expect(List.sortItemsFailure()).toEqual(expected);
  });

  it('should create action to handle error', () => {
    const error = new Error('error');
    const expected = {
      type: List.HANDLE_ERROR,
      payload: error,
    };

    expect(List.handleError(error)).toEqual(expected);
  });
});

describe('List reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(List.initialState);
  });

  it('should handle CREATE_LIST', () => {
    const action = {
      type: List.CREATE_LIST,
      payload: {
        listName: 'list name',
      },
    };

    const expected = {
      ...List.initialState,
      isLoading: true,
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CREATE_LIST_SUCCESS', () => {
    const action = {
      type: List.CREATE_LIST_SUCCESS,
      payload: {
        listId: '-foobar',
        listName: 'list name',
      },
    };

    const expected = {
      ...List.initialState,
      listId: '-foobar',
      listName: 'list name',
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CREATE_LIST_FAILURE', () => {
    const action = {
      type: List.CREATE_LIST_FAILURE,
      payload: {},
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(List.initialState);
  });

  it('should handle READ_LIST', () => {
    const action = {
      type: List.READ_LIST,
      payload: {
        listId: 'foo-123',
      },
    };

    const expected = {
      ...List.initialState,
      isLoading: true,
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(expected);
  });

  it('should handle READ_LIST_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      isLoading: true,
    };

    const action = {
      type: List.READ_LIST_SUCCESS,
      payload: {
        listId: 'foo-123',
        listName: 'list name',
      },
    };

    const expected = {
      ...List.initialState,
      listId: 'foo-123',
      listName: 'list name',
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle READ_LIST_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      isLoading: true,
    };

    const action = {
      type: List.READ_LIST_FAILURE,
      payload: {},
    };

    expect(
      reducer(initialState, action)
    ).toEqual(List.initialState);
  });

  it('should handle READ_LIST_ITEMS_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
    };

    const listItems = [
      {
        name: 'foo',
        index: 0,
        listId: 'foo123',
      },
      {
        name: 'bar',
        index: 1,
        listId: 'foo123',
      },
    ];

    const action = {
      type: List.READ_LIST_ITEMS_SUCCESS,
      payload: {
        listItems,
      },
    };

    const expected = {
      ...initialState,
      listItems,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle DELETE_LIST', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo-123',
    };

    const action = {
      type: List.DELETE_LIST,
      payload: {
        listId: 'foo-123',
      },
    };

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle DELETE_LIST_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      isLoading: true,
      listId: 'foo-123',
    };

    const action = {
      type: List.DELETE_LIST_SUCCESS,
      payload: {},
    };

    expect(
      reducer(initialState, action)
    ).toEqual(List.initialState);
  });

  it('should handle DELETE_LIST_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      isLoading: true,
      listId: 'foo-123',
    };

    const action = {
      type: List.DELETE_LIST_FAILURE,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle RENAME_LIST', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist'
    };

    const action = {
      type: List.RENAME_LIST,
      payload: {
        listId: 'foo123',
        listName: 'new name',
      },
    };

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle RENAME_LIST_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.RENAME_LIST_SUCCESS,
      payload: {
        listName: 'new name',
      },
    };

    const expected = {
      ...initialState,
      listName: 'new name',
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle RENAME_LIST_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.RENAME_LIST_FAILURE,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle ADD_ITEM', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
    };

    const action = {
      type: List.ADD_ITEM,
      payload: {
        listName: 'foo item',
        listId: 'foo123',
      },
    };

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle ADD_ITEM_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
    };

    const action = {
      type: List.ADD_ITEM_SUCCESS,
      payload: {},
    };

    expect(
      reducer(initialState, action)
    ).toEqual(initialState);
  });

  it('should handle ADD_ITEM_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
    };

    const action = {
      type: List.ADD_ITEM_FAILURE,
      payload: {},
    };

    expect(
      reducer(initialState, action)
    ).toEqual(initialState);
  });

  it('should handle EDIT_ITEM', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
    };

    const action = {
      type: List.EDIT_ITEM,
      payload: {
        name: 'foo',
        itemId: 'abc123',
        listId: 'foo123',
      },
    };

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle EDIT_ITEM_SUCCESS', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.EDIT_ITEM_SUCCESS,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle EDIT_ITEM_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.EDIT_ITEM_FAILURE,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle SORT_ITEMS', () => {
    const listItems = [
      {
        id: 'foo1',
        name: 'first',
        index: 0,
      },
      {
        id: 'foo2',
        name: 'second',
        index: 1,
      },
    ];

    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      listItems,
    };

    const action = {
      type: List.SORT_ITEMS,
      payload: {
        listItems,
        listId: 'foo123',
      },
    };

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle SORT_ITEMS_SUCCES', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.SORT_ITEMS_SUCCESS,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle SORT_ITEMS_FAILURE', () => {
    const initialState = {
      ...List.initialState,
      listId: 'foo123',
      listName: 'foolist',
      isLoading: true,
    };

    const action = {
      type: List.SORT_ITEMS_FAILURE,
      payload: {},
    };

    const expected = {
      ...initialState,
      isLoading: false,
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });

  it('should handle HANDLE_ERROR', () => {
    const action = {
      type: List.HANDLE_ERROR,
      payload: new Error('error'),
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(List.initialState);
  });
});
