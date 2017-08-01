// @flow
import styles from 'styles/components/Header.less';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

const Header: Component<{}> = (): React$Element<any> =>
  <header styleName="header">
    <h1 styleName="title">Cocheck</h1>
    <button styleName="button">Create new list</button>
  </header>;

export default pure(CSSModules(Header, styles));
