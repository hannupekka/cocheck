// @flow
import styles from 'styles/containers/Error.less';
import React from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  isError: boolean,
  errorMessage: string,
};

const Error: Component<Props> = (props: Props): ?React$Element<any> =>
  props.isError
    ? <div styleName="error">
        {props.errorMessage}
      </div>
    : null;

type MappedState = {
  isError: boolean,
  errorMessage: string,
};

const mapState: Function = (state: RootState): MappedState => ({
  isError: state.list.isError,
  errorMessage: state.list.errorMessage,
});

export default connect(mapState)(pure(CSSModules(Error, styles)));
