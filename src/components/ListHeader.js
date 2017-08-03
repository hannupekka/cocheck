// @flow
import styles from 'styles/components/ListHeader.less';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  isSticky: boolean,
  style: Object,
};

const ListHeader: Component<Props> = (props: Props): React$Element<any> =>
  <div style={props.style} styleName={props.isSticky ? 'sticky' : 'static'}>
    <button styleName="button">Check all</button>
    <button styleName="button">Check none</button>
    <button styleName="button">Delete list</button>
  </div>;

export default pure(CSSModules(ListHeader, styles));
