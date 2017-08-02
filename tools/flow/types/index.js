// Redux
declare type ThunkAction = {
  +type: string,
  +payload: Object
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
  +list: ListState,
  +router: Object,
}
