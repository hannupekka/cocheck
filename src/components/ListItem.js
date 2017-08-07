// @flow
import styles from 'styles/components/ListItem.less';
import React from 'react';
import { pure } from 'recompose';
import { SortableElement } from 'react-sortable-hoc';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  name: string,
};

const ListItem: Component<Props> = (props: Props): React$Element<any> =>
  <div styleName="item">
    {props.name}
  </div>;

export default pure(SortableElement(CSSModules(ListItem, styles)));
