// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import R from 'ramda';
import CSSModules from 'react-css-modules';
import ListHeader from 'containers/ListHeader';
import { bindWatchers, removeWatchers } from 'utils/watchers';
import { readList, addItem } from 'redux/list';
import getItems from 'redux/list/selectors';

type Props = {
  dispatch: Function,
  match: Object,
  id: string,
  items: Object,
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
    const { dispatch, id } = this.props;
    const item = this.itemInput.value;
    this.itemInput.value = '';

    dispatch(
      addItem({
        name: item,
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

    if (!isLoading && id !== '' && Object.keys(items).length === 0) {
      return <div styleName="wrapper--empty">No items yet - add some</div>;
    }

    const itemList = R.compose(
      R.values,
      R.mapObjIndexed((item, key) => {
        const { name } = item;

        return (
          <div key={key}>
            {name}
          </div>
        );
      })
    )(items);

    return (
      <div styleName="wrapper">
        {itemList}
      </div>
    );
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
  items: Object,
  isLoading: boolean,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  id: state.list.id,
  items: getItems(state),
  isLoading: state.list.isLoading,
});

export default connect(mapState)(CSSModules(List, styles));
