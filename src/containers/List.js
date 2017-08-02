// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

type Props = {};

// eslint-disable-next-line
export class List extends Component {
  props: Props;

  render() {
    return <div>Here be list content!</div>;
  }
}

type MappedState = {};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({});

export default connect(mapState)(CSSModules(List, styles));
