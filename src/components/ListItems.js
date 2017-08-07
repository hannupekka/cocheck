// @flow
import styles from 'styles/components/ListItems.less';
import React from 'react';
import { pure } from 'recompose';
import { SortableContainer } from 'react-sortable-hoc';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';
import ListItem from 'components/ListItem';

type Props = {
  items: Array<Item>,
};

const ListItems: Component<Props> = (props: Props): React$Element<any> => {
  const itemList = props.items.map((item, index) =>
    <ListItem key={item.id} index={index} name={item.name} />
  );

  return (
    <div styleName="wrapper">
      {itemList}
    </div>
  );
};

export default pure(SortableContainer(CSSModules(ListItems, styles)));
