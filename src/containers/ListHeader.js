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
  id: string,
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
    const { id, dispatch } = this.props;
    dispatch(ListActions.deleteList(id));
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

  render() {
    const { style, isSticky } = this.props;
    return (
      <div style={style} styleName={isSticky ? 'sticky' : 'static'}>
        <button styleName="button" onClick={this.onCheckAllClick}>
          Check all
        </button>
        <button styleName="button" onClick={this.onDeleteListClick}>
          Delete list
        </button>
      </div>
    );
  }
}

type MappedState = {
  id: string,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  id: state.list.id,
});

export default connect(mapState)(pure(CSSModules(ListHeader, styles)));
