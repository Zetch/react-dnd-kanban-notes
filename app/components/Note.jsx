import React from 'react';

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this._toggleEdit = this._toggleEdit.bind(this);
    this._checkEnter = this._checkEnter.bind(this);
  }

  _toggleEdit(e) {
    if (e) e.preventDefault();
    if (this.state.editing && this.props.onEdit) this.props.onEdit(e.target.value);
    this.setState({ editing: !this.state.editing });
  }

  _checkEnter(e) {
    if (e.key === 'Enter') this._toggleEdit(e);
  }

  render() {
    let content;

    if (this.state.editing) {
      content = (
        <input type='text'
          autoFocus={true}
          defaultValue={this.props.task}
          onBlur={this._toggleEdit}
          onKeyPress={this._checkEnter} />
      );
    } else {
      content = <span className="task" onClick={this._toggleEdit}>{ this.props.task }</span>;
    }

    return <div>{ content } <button className="delete" onClick={this.props.onDelete}>X</button></div>;
  }

}

export default Note;