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
      payload: {},
    };

    expect(List.createList()).toEqual(expected);
  });

  it('should create action for list created successfully', () => {
    const expected = {
      type: List.CREATE_LIST_SUCCESS,
      payload: {
        id: '-foobar',
      },
    };

    expect(List.createListSuccess('-foobar')).toEqual(expected);
  });

  it('should create action for list not created successfully', () => {
    const expected = {
      type: List.CREATE_LIST_FAILURE,
      payload: {
        errorMessage: 'Could not create new list',
      },
    };

    expect(List.createListFailure()).toEqual(expected);
  });

  it('should create action to delete list', () => {
    expect(true).toEqual(false);
  });

  it('should create action for list deleted successfully', () => {
    expect(true).toEqual(false);
  });

  it('should create action for list not deleted successfully', () => {
    expect(true).toEqual(false);
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
      payload: {},
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
      },
    };

    const expected = {
      ...List.initialState,
      id: '-foobar',
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CREATE_LIST_FAILURE', () => {
    const action = {
      type: List.CREATE_LIST_FAILURE,
      payload: {
        errorMessage: 'Could not create new list',
      },
    };

    const expected = {
      ...List.initialState,
      isError: true,
      errorMessage: 'Could not create new list',
    };

    expect(
      reducer(List.initialState, action)
    ).toEqual(expected);
  });

  it('should handle DELETE_LIST', () => {
    expect(true).toEqual(false);
  });

  it('should handle DELETE_LIST_SUCCESS', () => {
    expect(true).toEqual(false);
  });

  it('should handle DELETE_LIST_FAILURE', () => {
    expect(true).toEqual(false);
  });
});
