// @flow
import styles from 'styles/containers/Index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import * as ListActions from 'redux/list';

type Props = {
  dispatch: Function,
};

export class Index extends Component {
  props: Props;

  nameField: HTMLInputElement;
  bindNameField: Function;

  constructor(props: Object) {
    super(props);

    this.bindNameField = c => (this.nameField = c);
  }

  onCreateList = (): void => {
    const { dispatch } = this.props;
    const name = this.nameField.value;
    dispatch(ListActions.createList(name));
  };

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.onCreateList();
    }
  };

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="header">Start by creating new list</div>
        <input
          type="text"
          styleName="input"
          placeholder="List name (optional)"
          ref={this.bindNameField}
          onKeyDown={this.onKeyDown}
        />
        <button styleName="button" onClick={this.onCreateList}>
          <i className="fa fa-plus" aria-hidden />
          Create new list
        </button>
      </div>
    );
  }
}

type MappedState = {};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({});

export default connect(mapState)(CSSModules(Index, styles));
