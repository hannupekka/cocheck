// @flow
import styles from 'styles/components/ListItem.less';
import React, { Component } from 'react';
import { pure } from 'recompose';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import ClickOutside from 'react-click-outside';
import DebounceInput from 'react-debounce-input';
import CSSModules from 'react-css-modules';

type Props = {
  id: string,
  name: string,
  checked: boolean,
  isEdited: boolean,
  onEditStart: Function,
  onEditEnd: Function,
  onEditCancel: Function,
  onRemove: Function,
  onToggle: Function,
};

type State = {
  name: string,
};

const DragHandle = SortableHandle(() => <i className="fa fa-bars" aria-hidden />);

export class ListItem extends Component {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      name: props.name,
    };
  }

  componentWillReceiveProps = (nextProps: Object): void => {
    this.setState({ name: nextProps.name });
  };

  onToggle = (): void => {
    const itemId = this.props.id;
    const { checked } = this.props;

    this.props.onToggle({ checked, itemId });
  };

  onEdit = (): void => {
    this.props.onEditStart(this.props.id);
    requestAnimationFrame(() => {
      const field = document.getElementById(`input-${this.props.id}`);
      if (field) {
        field.focus();
      }
    });
  };

  onClickOutside = (): void => {
    const { id } = this.props;
    const { name } = this.state;

    if (name === '') {
      this.props.onEditCancel();
    } else {
      this.props.onEditEnd(name, id);
    }
  };

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.onClickOutside();
    } else if (e.key === 'Escape') {
      this.props.onEditCancel();
    }
  };

  onChange = (e: SyntheticInputEvent): void => {
    this.setState({ name: e.target.value });
  };

  onDelete = (): void => {
    this.props.onRemove(this.props.id);
  };

  renderName = (): React$Element<any> =>
    <DebounceInput
      id={`input-${this.props.id}`}
      debounceTimeout={50}
      readOnly={!this.props.isEdited}
      styleName={this.props.isEdited ? 'name--edit' : 'name--display'}
      type="text"
      value={this.state.name}
      onKeyDown={this.onKeyDown}
      onChange={this.onChange}
    />;

  render() {
    const { checked } = this.props;
    const icon = checked ? 'fa fa-check-square-o' : 'fa fa-square-o';

    return (
      <div styleName={checked ? 'item--checked' : 'item'}>
        <div styleName="handle">
          {<DragHandle />}
        </div>
        <div styleName="check">
          <i className={icon} aria-hidden onClick={this.onToggle} />
        </div>
        <div styleName="name">
          {this.props.isEdited
            ? <ClickOutside onClickOutside={this.onClickOutside}>
                {this.renderName()}
              </ClickOutside>
            : this.renderName()}
        </div>
        <div styleName="edit">
          <i className="fa fa-pencil" aria-hidden onClick={this.onEdit} />
        </div>
        <div styleName="delete">
          <i className="fa fa-trash-o" aria-hidden onClick={this.onDelete} />
        </div>
      </div>
    );
  }
}

export default pure(SortableElement(CSSModules(ListItem, styles)));
