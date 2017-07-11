// @flow
import styles from 'styles/containers/Index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

type Props = {};

export class Index extends Component {
  props: Props;

  render() {
    return <div>Oh hai!</div>;
  }
}

type MappedState = {};

const mapState: Function = (state: RootState): MappedState => ({});

export default connect(mapState)(CSSModules(Index, styles));
