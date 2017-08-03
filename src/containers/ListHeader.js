// @flow
import styles from 'styles/containers/ListHeader.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import CSSModules from 'react-css-modules';
import * as ConfirmActions from 'redux/confirm';

type Props = {
  dispatch: Function,
  isSticky: boolean,
  style: Object,
};

// eslint-disable-next-line
export class ListHeader extends Component {
  props: Props;

  onCheckAllConfirm = (): void => {
    // eslint-disable-next-line
    console.log('check all confirmed');
  };

  onCheckAllClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Check all?',
        onConfirm: this.onCheckAllConfirm,
      })
    );
  };

  render() {
    const { style, isSticky } = this.props;
    return (
      <div style={style} styleName={isSticky ? 'sticky' : 'static'}>
        <button onClick={this.onCheckAllClick}>Check all</button>
      </div>
    );
  }
}

type MappedState = {};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({});

export default connect(mapState)(pure(CSSModules(ListHeader, styles)));
