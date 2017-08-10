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
import getListItems from 'redux/list/selectors';

type Props = {
  dispatch: Function,
  listId: string,
  listName: string,
  listItems: Array<Item>,
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

  onCheckAllConfirm = (): void => {
    const { dispatch, listId, listItems } = this.props;
    dispatch(
      ListActions.toggleAllItems({
        checked: true,
        listId,
        listItems,
      })
    );
  };

  onUncheckAllConfirm = (): void => {
    const { dispatch, listId, listItems } = this.props;
    dispatch(
      ListActions.toggleAllItems({
        checked: false,
        listId,
        listItems,
      })
    );
  };

  onCheckAllClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Check all?',
        onConfirm: this.onCheckAllConfirm,
      })
    );
  };

  onUncheckAllClick = (): void => {
    const { dispatch } = this.props;
    dispatch(
      ConfirmActions.showConfirmation({
        text: 'Uncheck all?',
        onConfirm: this.onUncheckAllConfirm,
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

  onNameEdit = (): void => {
    this.setState({ edit: true });

    requestAnimationFrame(() => {
      const field = document.getElementById('listName');
      if (field) {
        field.focus();
      }
    });
  };

  onNameEditSave = (): void => {
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
      this.onNameEditSave();
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
        placeholder={this.state.listName === '' && !this.state.edit ? '(Unnamed list)' : ''}
        value={this.state.listName}
        onChange={this.onNameChange}
        onKeyDown={this.onKeyDown}
      />
      <i
        className={this.state.edit ? 'fa fa-check' : 'fa fa-pencil'}
        styleName="button--edit"
        aria-hidden
        onClick={this.state.edit ? this.onNameEditSave : this.onNameEdit}
      />
    </div>;

  render() {
    return (
      <div styleName="wrapper">
        {this.state.edit
          ? <ClickOutside styleName="name--click" onClickOutside={this.onNameEditSave}>
              {this.renderListName()}
            </ClickOutside>
          : this.renderListName()}
        <button styleName="button" onClick={this.onCheckAllClick}>
          <i className="fa fa-check-square-o" aria-hidden />
          <span styleName="button__text">Check all</span>
        </button>
        <button styleName="button" onClick={this.onUncheckAllClick}>
          <i className="fa fa-square-o" aria-hidden />
          <span styleName="button__text">Uncheck all</span>
        </button>
        <button styleName="button" onClick={this.onDeleteListClick}>
          <i className="fa fa-trash-o" aria-hidden />
          <span styleName="button__text">Delete list</span>
        </button>
      </div>
    );
  }
}

type MappedState = {
  listId: string,
  listName: string,
  listItems: Array<Item>,
};

// eslint-disable-next-line
const mapState: Function = (state: RootState): MappedState => ({
  listId: state.list.listId,
  listName: state.list.listName,
  listItems: getListItems(state),
});

export default connect(mapState)(pure(CSSModules(ListHeader, styles)));
