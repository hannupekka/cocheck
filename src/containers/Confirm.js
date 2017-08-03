// @flow
import styles from 'styles/containers/Confirm.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import CSSModules from 'react-css-modules';
import * as ConfirmActions from 'redux/confirm';

type Props = {
  dispatch: Function,
  isVisible: boolean,
  text: string,
  onConfirm: ?Function,
};

// eslint-disable-next-line
export class Confirm extends Component {
  props: Props;

  onCancel = (): void => {
    const { dispatch } = this.props;
    dispatch(ConfirmActions.hideConfirmation());
  };

  render() {
    const { isVisible, text, onConfirm } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div styleName="wrapper">
        <div styleName="content">
          <div styleName="text">
            {text}
          </div>
          <button styleName="button__dialog" onClick={onConfirm}>
            <i className="fa fa-check" aria-hidden="true" />
            Yes!
          </button>
          <button styleName="button__dialog" onClick={this.onCancel}>
            <i className="fa fa-ban" aria-hidden="true" />
            No, cancel!
          </button>
        </div>
      </div>
    );
  }
}

type MappedState = {
  isVisible: boolean,
  text: string,
  onConfirm: ?Function,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  isVisible: state.confirm.isVisible,
  text: state.confirm.text,
  onConfirm: state.confirm.onConfirm,
});

export default connect(mapState)(pure(CSSModules(Confirm, styles)));
