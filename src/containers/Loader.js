// @flow
import styles from 'styles/containers/Loader.less';
import React from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  isLoading: boolean,
};

const Loader: Component<Props> = (props: Props): ?React$Element<any> =>
  props.isLoading ? <div styleName="spinner" /> : null;

type MappedState = {
  isLoading: boolean,
};

const mapState: Function = (state: RootState): MappedState => ({
  isLoading: state.list.isLoading,
});

export default connect(mapState)(pure(CSSModules(Loader, styles)));
