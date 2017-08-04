// @flow
import styles from 'styles/main.less';
import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Header from 'components/Header';
import ConnectedConfirm from 'containers/Confirm';
import ConnectedNotifications from 'containers/Notifications';
import ConnectedLoader from 'containers/Loader';
import ConnectedIndex from 'containers/Index';
import ConnectedList from 'containers/List';
import CSSModules from 'react-css-modules';

const Routes = (props: { history: Object }): React$Element<any> => (
  <ConnectedRouter history={props.history}>
    <div>
      <ConnectedConfirm />
      <ConnectedNotifications />
      <Route path="/" component={Header} />
      <div styleName="content">
        <ConnectedLoader />
        <Route exact path="/" component={ConnectedIndex} />
        <Route exact path="/list/*" component={ConnectedList} />
      </div>
    </div>
  </ConnectedRouter>
);

export default CSSModules(Routes, styles);
