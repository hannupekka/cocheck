// @flow

export const SHOW_CONFIRMATION = 'cocheck/confirm/SHOW_CONFIRMATION';
export const HIDE_CONFIRMATION = 'cocheck/confirm/HIDE_CONFIRMATION';

export const showConfirmation =
  ({ text, onConfirm }: { text: string, onConfirm: Function }):
  ThunkAction => ({
    type: SHOW_CONFIRMATION,
    payload: {
      text,
      onConfirm,
    },
  });

export const hideConfirmation = (): ThunkAction => ({
  type: HIDE_CONFIRMATION,
  payload: {},
});

export const initialState: ConfirmState = {
  isVisible: false,
  text: '',
  onConfirm: null,
};

export default function
  reducer(state: ConfirmState = initialState, action: ThunkAction): ConfirmState {
    switch (action.type) {
      case SHOW_CONFIRMATION:
        return {
          ...initialState,
          isVisible: true,
          text: action.payload.text,
          onConfirm: action.payload.onConfirm,
        };
      case HIDE_CONFIRMATION:
        return initialState;
      default:
        return state;
    }
  };
