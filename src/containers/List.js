// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import { Helmet } from 'react-helmet';
import { pure } from 'recompose';
import CSSModules from 'react-css-modules';
import Stickyfill from 'stickyfilljs';
import ListHeader from 'containers/ListHeader';
import ListItems from 'containers/ListItems';
import { bindWatchers, removeWatchers } from 'utils/watchers';
import { readList, addItem, sortItems, setListFilter } from 'redux/list';
import getVisibleListItems from 'redux/list/selectors';

type Props = {
  dispatch: Function,
  match: Object,
  listId: string,
  listName: string,
  listItems: Array<Item>,
  listItemsFiltered: Array<Item>,
  listFilter: ListFilter,
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

    const sticky = document.querySelector('#sticky');
    Stickyfill.addOne(sticky);
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

      const body = document.querySelector('body');
      if (body) {
        window.scrollTo(0, body.scrollHeight);
      }
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

  onShowAll = (): void => {
    const { dispatch } = this.props;
    dispatch(setListFilter('all'));
  };

  onShowChecked = (): void => {
    const { dispatch } = this.props;
    dispatch(setListFilter('checked'));
  };

  onShowUnchecked = (): void => {
    const { dispatch } = this.props;
    dispatch(setListFilter('unchecked'));
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
      <div id="sticky" styleName="input__wrapper">
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
    const { listItems, listItemsFiltered, listId, listFilter, isLoading } = this.props;

    if (!isLoading && listId !== '' && listItems.length === 0) {
      return <div styleName="empty">No items yet - add some</div>;
    }

    if (listItems.length > 0 && listItemsFiltered.length === 0) {
      return (
        <div styleName="empty--filtered">
          List has no {listFilter} items
        </div>
      );
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

  maybeRenderFilters = (): ?React$Element<any> => {
    const { listItems, listFilter } = this.props;

    if (listItems.length === 0) {
      return null;
    }

    return (
      <div styleName="filters">
        <a
          tabIndex={0}
          role="button"
          styleName={listFilter === 'all' ? 'filter--active' : 'filter'}
          onClick={this.onShowAll}
        >
          All
        </a>
        <span styleName="filters__separator">-</span>
        <a
          tabIndex={0}
          role="button"
          styleName={listFilter === 'checked' ? 'filter--active' : 'filter'}
          onClick={this.onShowChecked}
        >
          Checked
        </a>
        <span styleName="filters__separator">-</span>
        <a
          tabIndex={0}
          role="button"
          styleName={listFilter === 'unchecked' ? 'filter--active' : 'filter'}
          onClick={this.onShowUnchecked}
        >
          Unchecked
        </a>
      </div>
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
        {this.maybeRenderFilters()}
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
  listItemsFiltered: Array<Item>,
  listFilter: ListFilter,
  isLoading: boolean,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listName: state.list.listName,
  listItems: state.list.listItems,
  listItemsFiltered: getVisibleListItems(state),
  listFilter: state.list.listFilter,
  isLoading: state.list.isLoading,
});

export default connect(mapState)(pure(CSSModules(List, styles)));
