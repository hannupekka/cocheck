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

  onCreateList = (): void => {
    const { dispatch } = this.props;
    dispatch(ListActions.createList());
  };

  render() {
    return (
      <div>
        <button styleName="button" onClick={this.onCreateList}>
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
