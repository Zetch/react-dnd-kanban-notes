import React from 'react';
import './Editable.css';


class Editable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this._toggleEdit = this._toggleEdit.bind(this);
    this._checkEnter = this._checkEnter.bind(this);
  }

  _toggleEdit(e) {
    if (e) e.preventDefault();
    if (this.state.editing && this.props.onEdit) {
      const value = e.target.value.trim();
      if (value !== this.props.value) this.props.onEdit(value);
    }
    this.setState({ editing: !this.state.editing });
  }

  _checkEnter(e) {
    if (e.key === 'Enter') this._toggleEdit(e);
  }

  render() {
    if (this.state.editing) {
      return (
        <input type="text"
          className="editable"
          autoFocus="true"
          defaultValue={this.props.value}
          onBlur={this._toggleEdit}
          onKeyPress={this._checkEnter} />
      );
    } else {
      return <span className="editable" onClick={this._toggleEdit}>{ this.props.value }</span>;
    }
  }

}

export default Editable;