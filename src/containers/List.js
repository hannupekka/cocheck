// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import { Helmet } from 'react-helmet';
import CSSModules from 'react-css-modules';
import ListHeader from 'containers/ListHeader';
import ListItems from 'containers/ListItems';
import { bindWatchers, removeWatchers } from 'utils/watchers';
import { readList, addItem, sortItems } from 'redux/list';
import getItems from 'redux/list/selectors';

type Props = {
  dispatch: Function,
  match: Object,
  listId: string,
  listName: string,
  listItems: Array<Item>,
  isLoading: boolean,
};

export class List extends Component {
  props: Props;

  itemInput: HTMLInputElement;
  bindItemInput: Function;

  constructor(props: Object) {
    super(props);

    this.bindItemInput = c => (this.itemInput = c);
  }

  componentWillMount = (): void => {
    const { dispatch, match } = this.props;
    const listId = match.params[0];

    // Get list ID from router params.
    dispatch(readList(listId));

    // Bind Firebase watchers.
    bindWatchers(listId, dispatch);
  };

  componentDidMount = (): void => {
    if (this.itemInput) {
      this.itemInput.focus();
    }
  };

  componentWillUnmount = (): void => {
    const { listId } = this.props;
    removeWatchers(listId);
  };

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.onAddItem();
    }
  };

  onAddItem = (): void => {
    const { dispatch, listId, listItems } = this.props;
    const name = this.itemInput.value;

    if (name !== '') {
      this.itemInput.value = '';

      const index = listItems.length > 0 ? Math.max(...listItems.map(item => item.index)) + 1 : 0;

      dispatch(
        addItem({
          name,
          index,
          listId,
        })
      );
    }
  };

  onSortEnd = (props: Object): void => {
    const { listItems, listId, dispatch } = this.props;

    const newItems = arrayMove(listItems, props.oldIndex, props.newIndex).map((item, index) => ({
      ...item,
      index,
    }));

    dispatch(
      sortItems({
        listItems: newItems,
        listId,
      })
    );
  };

  maybeRenderHeader = (): ?React$Element<any> => {
    const { isLoading, listId } = this.props;

    if (isLoading && listId === '') {
      return null;
    }

    return <ListHeader />;
  };

  maybeRenderInput = (): ?React$Element<any> => {
    const { listId, isLoading } = this.props;

    if (isLoading && listId === '') {
      return null;
    }

    return (
      <div styleName="input__wrapper">
        <input
          ref={this.bindItemInput}
          styleName="input"
          type="text"
          placeholder="New item"
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  };

  maybeRenderHelp = (): ?React$Element<any> => {
    const { listId, isLoading } = this.props;

    if (isLoading && listId === '') {
      return null;
    }

    return <div styleName="help">Share this list to others by giving them URL of this page.</div>;
  };

  maybeRenderItems = (): ?React$Element<any> => {
    const { listItems, listId, isLoading } = this.props;

    if (!isLoading && listId !== '' && listItems.length === 0) {
      return <div styleName="empty">No items yet - add some</div>;
    }

    return (
      <ListItems
        items={listItems}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        pressDelay={100}
        lockToContainerEdges
        useDragHandle
      />
    );
  };

  render() {
    const { listName } = this.props;

    return (
      <div styleName="wrapper">
        <Helmet>
          <title>
            {listName === '' ? 'Cocheck' : `Cocheck - ${listName}`}
          </title>
        </Helmet>
        {this.maybeRenderHeader()}
        {this.maybeRenderInput()}
        {this.maybeRenderItems()}
        {this.maybeRenderHelp()}
      </div>
    );
  }
}

type MappedState = {
  listId: string,
  listName: string,
  listItems: Array<Item>,
  isLoading: boolean,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listName: state.list.listName,
  listItems: getItems(state),
  isLoading: state.list.isLoading,
});

export default connect(mapState)(CSSModules(List, styles));
