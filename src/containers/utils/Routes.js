// @flow
import styles from 'styles/main.less';
import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Header from 'components/Header';
import ConnectedIndex from 'containers/Index';
import CSSModules from 'react-css-modules';

const Routes = (props: { history: Object }): React$Element<any> => (
  <ConnectedRouter history={props.history}>
    <div>
      <Route path="/" component={Header} />
      <div styleName="content">
        <Route exact path="/" component={ConnectedIndex} />
      </div>
    </div>
  </ConnectedRouter>
);

export default CSSModules(Routes, styles);
