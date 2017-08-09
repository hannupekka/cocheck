// @flow
import styles from 'styles/containers/ListHeader.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import ClickOutside from 'react-click-outside';
import DebounceInput from 'react-debounce-input';
import CSSModules from 'react-css-modules';
import * as ConfirmActions from 'redux/confirm';
import * as ListActions from 'redux/list';

type Props = {
  dispatch: Function,
  listId: string,
  listName: string,
  isSticky: boolean,
  style: Object,
};

type State = {
  edit: boolean,
  listName: ?string,
};

// eslint-disable-next-line
export class ListHeader extends Component {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      edit: false,
      listName: props.listName,
    };
  }

  componentWillReceiveProps = (nextProps: Object): void => {
    this.setState({ listName: nextProps.listName });
  };

  onCheckAllConfirm = (): void => {};

  onCheckAllClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Check all?',
        onConfirm: this.onCheckAllConfirm,
      })
    );
  };

  onDeleteListConfirm = (): void => {
    const { listId, dispatch } = this.props;
    dispatch(ListActions.deleteList(listId));
  };

  onDeleteListClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Really delete list?',
        onConfirm: this.onDeleteListConfirm,
      })
    );
  };

  onNameDoubleClick = (): void => {
    this.setState({ edit: true });

    requestAnimationFrame(() => {
      const field = document.getElementById('listName');
      if (field) {
        field.focus();
      }
    });
  };

  onNameClickOutside = (): void => {
    const { dispatch } = this.props;
    this.setState({ edit: false });

    const { listId } = this.props;
    const { listName } = this.state;

    if (listName !== this.props.listName) {
      dispatch(ListActions.renameList({ listName, listId }));
    }
  };

  onNameChange = (e: SyntheticInputEvent): void => {
    this.setState({ listName: e.target.value });
  };

  onNameEditCancel = () => {
    this.setState({ edit: false, listName: this.props.listName });
  };

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.onNameClickOutside();
    } else if (e.key === 'Escape') {
      this.onNameEditCancel();
    }
  };

  renderListName = (): React$Element<any> =>
    <div styleName="name">
      <DebounceInput
        id="listName"
        debounceTimeout={50}
        readOnly={!this.state.edit}
        styleName={this.state.edit ? 'edit' : 'display'}
        type="text"
        value={this.state.listName}
        onChange={this.onNameChange}
        onKeyDown={this.onKeyDown}
        onDoubleClick={this.onNameDoubleClick}
      />
    </div>;

  render() {
    const { style, isSticky } = this.props;
    return (
      <div style={style} styleName={isSticky ? 'sticky' : 'static'}>
        {this.state.edit
          ? <ClickOutside styleName="name--click" onClickOutside={this.onNameClickOutside}>
              {this.renderListName()}
            </ClickOutside>
          : this.renderListName()}
        <button styleName="button" onClick={this.onCheckAllClick}>
          <i className="fa fa-check-square-o" aria-hidden />
          Check all
        </button>
        <button styleName="button" onClick={this.onDeleteListClick}>
          <i className="fa fa-trash-o" aria-hidden />
          Delete list
        </button>
      </div>
    );
  }
}

type MappedState = {
  listId: string,
  listName: string,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listName: state.list.listName,
});

export default connect(mapState)(pure(CSSModules(ListHeader, styles)));
