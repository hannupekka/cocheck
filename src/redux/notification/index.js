// @flow
import cuid from 'cuid';

export const SHOW_NOTIFICATION = 'cocheck/confirm/SHOW_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'cocheck/confirm/DISMISS_NOTIFICATION';

// Options.
const defaultOptions = {
  title: '',
  body: '',
  type: 'success',
  icon: '',
  timeout: 2000,
};

export const dismissNotification = (notificationId: string): ThunkAction => ({
  type: DISMISS_NOTIFICATION,
  payload: {
    notificationId,
  },
});

export const showNotification = (options: NotificationOptions): Function =>
  (dispatch: Function) => {
    const notificationId = cuid();

    const {
      title = defaultOptions.title,
      body = defaultOptions.body,
      type = defaultOptions.type,
      icon = defaultOptions.icon,
      timeout = defaultOptions.timeout,
    } = options;

    const timeoutId = setTimeout(() => {
      dispatch(dismissNotification(notificationId));
    }, timeout);

    return dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        notificationId,
        timeoutId,
        title,
        body,
        type,
        icon,
      },
    });
  };

export const initialState: NotificationState = {
  notifications: [],
};

export default function
  reducer(state: NotificationState = initialState, action: ThunkAction): NotificationState {
    switch (action.type) {
      case SHOW_NOTIFICATION:
        return {
          ...state,
          notifications: [
            ...state.notifications,
            action.payload,
          ],
        }
        case DISMISS_NOTIFICATION:
          return {
            ...state,
            notifications: state.notifications.filter(notification =>
              notification.notificationId !== action.payload.notificationId
            ),
          };
      default:
        return state;
    }
  };
