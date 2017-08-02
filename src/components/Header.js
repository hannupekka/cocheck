// @flow
import styles from 'styles/components/Header.less';
import React from 'react';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

const Header: Component<{}> = (): React$Element<any> =>
  <header styleName="header">
    <h1 styleName="title">
      <Link to="/">Cocheck</Link>
    </h1>
  </header>;

export default pure(CSSModules(Header, styles));
