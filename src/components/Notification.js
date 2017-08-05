// @flow
import styles from 'styles/components/Notification.less';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  data: NotificationData,
  onDismiss: (notificationId: string) => ThunkAction,
};

const Notification: Component<Props> = (props: Props): React$Element<any> => {
  const onDismiss = (): void => {
    const { notificationId, timeoutId } = props.data;
    clearTimeout(timeoutId);
    props.onDismiss(notificationId);
  };

  const maybeRenderIcon = (): ?React$Element<any> => {
    const icon = props.data.icon;
    if (!icon) {
      return null;
    }

    return <i className={`fa fa-${icon}`} aria-hidden="true" />;
  };

  const { title, body, type } = props.data;

  return (
    <div styleName={type} onClick={onDismiss} role="button" tabIndex={0}>
      <div styleName="left">
        <div styleName="icon">
          {maybeRenderIcon()}
        </div>
      </div>
      <div styleName="right">
        <div styleName="title">
          {title}
        </div>
        <div styleName="body">
          {body}
        </div>
      </div>
    </div>
  );
};

export default pure(CSSModules(Notification, styles));
