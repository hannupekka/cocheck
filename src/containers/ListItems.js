// @flow
import styles from 'styles/containers/ListItems.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { SortableContainer } from 'react-sortable-hoc';
import CSSModules from 'react-css-modules';
import ListItem from 'components/ListItem';
import { editItem, removeItem, toggleItem } from 'redux/list';

type Props = {
  dispatch: Function,
  listItems: Array<Item>,
  listId: string,
};

type State = {
  editItemId: ?string,
};

export class ListItems extends Component {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      editItemId: null,
    };
  }

  onEditStart = (id: string): void => {
    this.setState({ editItemId: id });
  };

  onEditEnd = (name: string, itemId: string): void => {
    const { dispatch, listId } = this.props;

    this.setState({ editItemId: null });
    dispatch(
      editItem({
        name,
        itemId,
        listId,
      })
    );
  };

  onEditCancel = (): void => {
    this.setState({ editItemId: null });
  };

  onRemove = (itemId: string) => {
    const { dispatch, listId } = this.props;

    dispatch(removeItem({ itemId, listId }));
  };

  // eslint-disable-next-line react/no-unused-prop-types
  onToggle = ({ checked, itemId }: { checked: boolean, itemId: string }) => {
    const { dispatch, listId } = this.props;

    dispatch(toggleItem({ checked, itemId, listId }));
  };

  renderItemList = (): Array<React$Element<any>> =>
    this.props.listItems.map((item, index) =>
      <ListItem
        key={item.id}
        index={index}
        id={item.id}
        name={item.name}
        checked={item.checked}
        onEditStart={this.onEditStart}
        onEditEnd={this.onEditEnd}
        onEditCancel={this.onEditCancel}
        onRemove={this.onRemove}
        onToggle={this.onToggle}
        isEdited={this.state.editItemId === item.id}
      />
    );

  render() {
    return (
      <div styleName="wrapper">
        {this.renderItemList()}
      </div>
    );
  }
}

type MappedState = {
  listId: string,
  listItems: Array<Item>,
};

const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listItems: state.list.listItems,
});

export default connect(mapState)(pure(SortableContainer(CSSModules(ListItems, styles))));
