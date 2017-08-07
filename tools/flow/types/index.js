// Redux
declare type ThunkAction = {
  +type: string,
  +payload: Object
}

declare type NotificationData = {
  notificationId: string,
  timeoutId: number,
  title: string,
  body: string,
  type: NotificationType,
  icon: string
}

declare type NotificationType =
  | 'success'
  | 'error';

declare type NotificationOptions = {
  title: string,
  body: string,
  type: NotificationType,
  icon?: string,
  timeout?: number
}

declare type ConfirmState = {
  +isVisible: boolean,
  +text: string,
  +onConfirm: ?Function,
}

declare type NotificationState = {
  +notifications: Array<Object>
}

declare type Item = {|
  id: string,
  index: number,
  name: string
|}

declare type ListState = {
  +isLoading: boolean,
  +id: string,
  +name: string,
  +items: Array<Item>
}

declare type RootState = {
  +confirm: ConfirmState,
  +notification: NotificationState,
  +list: ListState,
  +router: Object,
}
