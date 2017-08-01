import reducer, * as List from 'redux/list';

describe('List actions', () => {
  it('should create action to create list', () => {
    const expected = {
      type: List.CREATE_LIST,
      payload: {},
    };

    expect(List.createList()).toEqual(expected);
  });

  it('should create action to delete list', () => {
    const expected = {
      type: List.DELETE_LIST,
      payload: {},
    };

    expect(List.deleteList()).toEqual(expected);
  });

  it('should create action to add item', () => {
    const item = {
      name: 'item name',
      checked: false,
    };

    const result = List.addItem(item);
    expect(result.type).toEqual(List.ADD_ITEM);
    expect(result.payload).not.toHaveProperty('id', '');
    expect(result.payload.name).toEqual(item.name);
    expect(result.payload.checked).toEqual(item.checked);
  });

  it('should create action to edit item', () => {
    const name = 'new name';

    const expected = {
      type: List.EDIT_ITEM,
      payload: {
        name,
      },
    };

    expect(List.editItem(name)).toEqual(expected);
  });

  it('should create action to check item', () => {
    const id = 123;

    const expected = {
      type: List.CHECK_ITEM,
      payload: {
        id,
      },
    };

    expect(List.checkItem(id)).toEqual(expected);
  });

  it('should create action to uncheck item', () => {
    const id = 123;

    const expected = {
      type: List.UNCHECK_ITEM,
      payload: {
        id,
      },
    };

    expect(List.uncheckItem(id)).toEqual(expected);
  });

  it('should create action to remove item', () => {
    const id = 123;

    const expected = {
      type: List.REMOVE_ITEM,
      payload: {
        id,
      },
    };

    expect(List.removeItem(id)).toEqual(expected);
  });

  it('should create action to check all items', () => {
    const expected = {
      type: List.CHECK_ALL,
      payload: {},
    };

    expect(List.checkAll()).toEqual(expected);
  });

  it('should create action to uncheck all items', () => {
    const expected = {
      type: List.UNCHECK_ALL,
      payload: {},
    };

    expect(List.uncheckAll()).toEqual(expected);
  });
});

describe('List reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(List.initialState);
  });
});
