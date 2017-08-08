// @flow
import styles from 'styles/containers/ListHeader.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import CSSModules from 'react-css-modules';
import * as ConfirmActions from 'redux/confirm';
import * as ListActions from 'redux/list';

type Props = {
  dispatch: Function,
  listId: string,
  listName: string,
  isSticky: boolean,
  style: Object,
};

// eslint-disable-next-line
export class ListHeader extends Component {
  props: Props;

  onCheckAllConfirm = (): void => {};

  onCheckAllClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Check all?',
        onConfirm: this.onCheckAllConfirm,
      })
    );
  };

  onDeleteListConfirm = (): void => {
    const { listId, dispatch } = this.props;
    dispatch(ListActions.deleteList(listId));
  };

  onDeleteListClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Really delete list?',
        onConfirm: this.onDeleteListConfirm,
      })
    );
  };

  maybeRenderListName = (): ?React$Element<any> => {
    const { listName } = this.props;

    if (listName === '') {
      return null;
    }

    return (
      <div styleName="name">
        {listName}
      </div>
    );
  };

  render() {
    const { style, isSticky } = this.props;
    return (
      <div style={style} styleName={isSticky ? 'sticky' : 'static'}>
        {this.maybeRenderListName()}
        <button styleName="button" onClick={this.onCheckAllClick}>
          <i className="fa fa-check-square-o" aria-hidden />
          Check all
        </button>
        <button styleName="button" onClick={this.onDeleteListClick}>
          <i className="fa fa-trash-o" aria-hidden />
          Delete list
        </button>
      </div>
    );
  }
}

type MappedState = {
  listId: string,
  listName: string,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listName: state.list.listName,
});

export default connect(mapState)(pure(CSSModules(ListHeader, styles)));
