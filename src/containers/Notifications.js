// @flow
import styles from 'styles/containers/Notifications.less';
import React, { Component } from 'react';
import { pure } from 'recompose';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import Notification from 'components/Notification';
import * as NotificationActions from 'redux/notification';

type Props = {
  dispatch: Function,
  notifications: Array<NotificationData>,
};

class Notifications extends Component {
  props: Props;

  onDismissNotification = (notificationId: string): void => {
    const { dispatch } = this.props;
    dispatch(NotificationActions.dismissNotification(notificationId));
  };

  renderNotifications = () => {
    const { notifications } = this.props;

    return notifications.map(notification =>
      <CSSTransition
        key={notification.notificationId}
        timeout={{ enter: 150, exit: 150 }}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enter__active,
          leave: styles.leave,
          leaveActive: styles.leave__active,
        }}
      >
        <Notification data={notification} onDismiss={this.onDismissNotification} />
      </CSSTransition>
    );
  };

  render(): React$Element<any> {
    return (
      <div styleName="wrapper">
        <TransitionGroup>
          {this.renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
}

type MappedState = {
  notifications: Array<NotificationData>,
};

const mapState: Function = (state: RootState): MappedState => ({
  notifications: state.notification.notifications,
});

export default connect(mapState)(pure(CSSModules(Notifications, styles)));
