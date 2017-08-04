// @flow
import styles from 'styles/containers/List.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import CSSModules from 'react-css-modules';
import ListHeader from 'containers/ListHeader';
import bindWatchers from 'utils/watchers';
import { readList } from 'redux/list';

type Props = {
  dispatch: Function,
  match: Object,
};

export class List extends Component {
  props: Props;

  componentWillMount = () => {
    const { dispatch, match } = this.props;
    const id = match.params[0];

    // Get list ID from router params.
    dispatch(readList(id));

    // Bind Firebase watchers.
    bindWatchers(id, dispatch);
  };

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
