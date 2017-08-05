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
        name: 'list name',
      },
    };

    expect(List.createList('list name')).toEqual(expected);
  });

  it('should create action for list created successfully', () => {
    const expected = {
      type: List.CREATE_LIST_SUCCESS,
      payload: {
        id: '-foobar',
        name: 'list name',
      },
    };

    expect(List.createListSuccess({
      id: '-foobar',
      name: 'list name',
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
        id: 'foo-123',
      },
    };

    expect(List.readList('foo-123')).toEqual(expected);
  });

  it('should create action for list read successfully', () => {
    const expected = {
      type: List.READ_LIST_SUCCESS,
      payload: {
        id: 'foo-123',
        name: 'list name',
      },
    };

    expect(List.readListSuccess({
      id: 'foo-123',
      name: 'list name',
    })).toEqual(expected);
  });

  it('should create action for list not read successfully', () => {
    const expected = {
      type: List.READ_LIST_FAILURE,
      payload: {},
    };

    expect(List.readListFailure()).toEqual(expected);
  });

  it('should create action to delete list', () => {
    const expected = {
      type: List.DELETE_LIST,
      payload: {
        id: 'foo-123',
      },
    };

    expect(List.deleteList('foo-123')).toEqual(expected);
  });

  it('should create action for list deleted successfully', () => {
    const expected = {
      type: List.DELETE_LIST_SUCCESS,
      payload: {
        id: 'foo-123',
      },
    };

    expect(List.deleteListSuccess('foo-123')).toEqual(expected);
  });

  it('should create action for list not deleted successfully', () => {
    const expected = {
      type: List.DELETE_LIST_FAILURE,
      payload: {},
    };

    expect(List.deleteListFailure()).toEqual(expected);
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
        name: 'list name',
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
        id: '-foobar',
        name: 'list name',
      },
    };

    const expected = {
      ...List.initialState,
      id: '-foobar',
      name: 'list name',
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
        id: 'foo-123',
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
        id: 'foo-123',
        name: 'list name',
      },
    };

    const expected = {
      ...List.initialState,
      id: 'foo-123',
      name: 'list name',
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

  it('should handle DELETE_LIST', () => {
    const initialState = {
      ...List.initialState,
      id: 'foo-123',
    };

    const action = {
      type: List.DELETE_LIST,
      payload: {
        id: 'foo-123',
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
      id: 'foo-123',
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
      id: 'foo-123',
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
