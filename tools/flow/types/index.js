// Redux
declare type ThunkAction = {
  +type: string,
  +payload: Object
}

declare type ConfirmState = {
  +isVisible: boolean,
  +text: string,
  +onConfirm: ?Function,
}

declare type ListState = {
  +isLoading: boolean,
  +isError: boolean,
  +errorMessage: string,
  +id: string,
  +entities: {
    +items: Object
  },
  +result: Array<Number>
}

declare type RootState = {
  +confirm: ConfirmState,
  +list: ListState,
  +router: Object,
}
