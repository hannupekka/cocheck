/* eslint-env jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import reducer, * as Notification from 'redux/notification';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notification async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create action to show success notification', () => {
    const notification = {
      title: 'title',
      body: 'body',
      icon: 'check',
      type: 'success',
    };

    const store = mockStore();

    store.dispatch(Notification.showNotification(notification));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);

    const action = actions[0];

    expect(action.type).toEqual(Notification.SHOW_NOTIFICATION);
    expect(action.payload.title).toMatch('title');
    expect(action.payload.body).toMatch('body');
    expect(action.payload.icon).toMatch('check');
    expect(action.payload.type).toMatch('success');
    expect(action.payload.notificationId).toBeDefined();
    expect(action.payload).not.toHaveProperty('notificationId', '');
    expect(action.payload.timeoutId).toBeGreaterThanOrEqual(0);
  });

  it('should create action to show error notification', () => {
    const notification = {
      title: 'title',
      body: 'body',
      icon: 'exclamation',
      type: 'error',
    };

    const store = mockStore();

    store.dispatch(Notification.showNotification(notification));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);

    const action = actions[0];

    expect(action.type).toEqual(Notification.SHOW_NOTIFICATION);
    expect(action.payload.title).toMatch('title');
    expect(action.payload.body).toMatch('body');
    expect(action.payload.icon).toMatch('exclamation');
    expect(action.payload.type).toMatch('error');
    expect(action.payload.notificationId).toBeDefined();
    expect(action.payload).not.toHaveProperty('notificationId', '');
    expect(action.payload.timeoutId).toBeGreaterThanOrEqual(0);
  });
});

describe('Notification actions', () => {
  it('should create action to dismiss notification', () => {
    const expected = {
      type: Notification.DISMISS_NOTIFICATION,
      payload: {
        notificationId: 'foo123',
      },
    };

    expect(Notification.dismissNotification('foo123')).toEqual(expected);
  });
});

describe('Notification reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(Notification.initialState);
  });

  it('should handle SHOW_NOTIFICATION', () => {
    const action = {
      type: Notification.SHOW_NOTIFICATION,
      payload: {
        title: 'title',
        body: 'body',
        icon: 'check',
        type: 'success',
        notificationId: 'foo123',
        timeoutId: 1,
      },
    };

    const expected = {
      notifications: [
        action.payload,
      ],
    };

    expect(
      reducer(Notification.initialState, action)
    ).toEqual(expected);
  });

  it('should handle DISMISS_NOTIFICATION', () => {
    const initialState = {
      notifications: [
        {
          title: 'title',
          body: 'body',
          icon: 'check',
          type: 'success',
          notificationId: 'foo123',
          timeoutId: 1,
        },
        {
          title: 'title 2',
          body: 'body 2',
          icon: 'exclamation',
          type: 'error',
          notificationId: 'foo456',
          timeoutId: 2,
        },
      ],
    };

    const action = {
      type: Notification.DISMISS_NOTIFICATION,
      payload: {
        notificationId: 'foo123',
      },
    };

    const expected = {
      notifications: [
        {
          title: 'title 2',
          body: 'body 2',
          icon: 'exclamation',
          type: 'error',
          notificationId: 'foo456',
          timeoutId: 2,
        },
      ],
    };

    expect(
      reducer(initialState, action)
    ).toEqual(expected);
  });
});
