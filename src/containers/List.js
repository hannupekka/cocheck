// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import CSSModules from 'react-css-modules';
import ListHeader from 'containers/ListHeader';

type Props = {
  dispatch: Function,
};

// eslint-disable-next-line
export class List extends Component {
  props: Props;

  render() {
    return (
      <StickyContainer>
        <Sticky topOffset={-16}>
          {({ isSticky, style }) => <ListHeader isSticky={isSticky} style={style} />}
        </Sticky>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
        <p>Here be list content!</p>
      </StickyContainer>
    );
  }
}

type MappedState = {};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({});

export default connect(mapState)(CSSModules(List, styles));
