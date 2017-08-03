/* eslint-env jest */
import reducer, * as Confirm from 'redux/confirm';

describe('Confirm actions', () => {
  it('should create action to show confirm', () => {
    const onConfirm = () => ({});
    const expected = {
      type: Confirm.SHOW_CONFIRMATION,
      payload: {
        text: 'Confirm?',
        onConfirm,
      },
    };

    expect(Confirm.showConfirmation({
      text: 'Confirm?',
      onConfirm,
    })).toEqual(expected);
  });

  it('should create action to hide confirm', () => {
    const expected = {
      type: Confirm.HIDE_CONFIRMATION,
      payload: {},
    };

    expect(Confirm.hideConfirmation()).toEqual(expected);
  });
});

describe('Confirm reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(Confirm.initialState);
  });

  it('should handle SHOW_CONFIRM', () => {
    const onConfirm = () => ({});

    const action = {
      type: Confirm.SHOW_CONFIRMATION,
      payload: {
        text: 'Confirm?',
        onConfirm,
      },
    };

    const expected = {
      ...Confirm.initialState,
      isVisible: true,
      text: 'Confirm?',
      onConfirm,
    };

    expect(
      reducer(Confirm.initialState, action)
    ).toEqual(expected);
  });

  it('should handle HIDE_CONFIRM', () => {
    const onConfirm = () => ({});

    const initialState = {
      ...Confirm.initialState,
      isVisible: true,
      text: 'Confirm?',
      onConfirm,
    };

    const action = {
      type: Confirm.HIDE_CONFIRMATION,
      payload: {},
    };

    expect(
      reducer(initialState, action)
    ).toEqual(Confirm.initialState);
  });
});
