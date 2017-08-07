// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { arrayMove } from 'react-sortable-hoc';
import CSSModules from 'react-css-modules';
import ListHeader from 'containers/ListHeader';
import ListItems from 'components/ListItems';
import { bindWatchers, removeWatchers } from 'utils/watchers';
import { readList, addItem, sortItems } from 'redux/list';
import getItems from 'redux/list/selectors';

type Props = {
  dispatch: Function,
  match: Object,
  id: string,
  items: Array<Item>,
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
    const id = match.params[0];

    // Get list ID from router params.
    dispatch(readList(id));

    // Bind Firebase watchers.
    bindWatchers(id, dispatch);
  };

  componentWillUnmount = (): void => {
    removeWatchers();
  };

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.onAddItem();
    }
  };

  onAddItem = (): void => {
    const { dispatch, id, items } = this.props;
    const name = this.itemInput.value;

    if (name !== '') {
      this.itemInput.value = '';

      const index = items.length > 0 ? Math.max(...items.map(item => item.index)) + 1 : 0;

      dispatch(
        addItem({
          name,
          index,
          listId: id,
        })
      );
    }
  };

  onSortEnd = (props: Object): void => {
    const { items, id, dispatch } = this.props;

    const newItems = arrayMove(items, props.oldIndex, props.newIndex).map((item, index) => ({
      ...item,
      index,
    }));

    dispatch(
      sortItems({
        items: newItems,
        listId: id,
      })
    );
  };

  maybeRenderHeader = (): ?React$Element<any> => {
    const { isLoading, id } = this.props;

    if (isLoading && id === '') {
      return null;
    }

    return (
      <Sticky topOffset={-16}>
        {({ isSticky, style }) => <ListHeader isSticky={isSticky} style={style} />}
      </Sticky>
    );
  };

  renderInput = (): React$Element<any> =>
    <div styleName="input__wrapper">
      <input
        ref={this.bindItemInput}
        styleName="input"
        type="text"
        placeholder="New list item"
        onKeyDown={this.onKeyDown}
      />
    </div>;

  maybeRenderItems = (): ?React$Element<any> => {
    const { items, id, isLoading } = this.props;

    if (!isLoading && id !== '' && items.length === 0) {
      return <div styleName="empty">No items yet - add some</div>;
    }

    return <ListItems items={items} onSortEnd={this.onSortEnd} lockAxis="y" />;
  };

  render() {
    return (
      <StickyContainer>
        {this.maybeRenderHeader()}
        {this.renderInput()}
        {this.maybeRenderItems()}
      </StickyContainer>
    );
  }
}

type MappedState = {
  id: string,
  items: Array<Item>,
  isLoading: boolean,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  id: state.list.id,
  items: getItems(state),
  isLoading: state.list.isLoading,
});

export default connect(mapState)(CSSModules(List, styles));
