import React from 'react';
import Note from './Note.jsx';

class NoteList extends React.Component {

  render() {
    const notes = this.props.tasks.map(note => {
      return (
        <li className="note" key={`note${note.id}`}>
          <Note
            task={note.task}
            onEdit={this.props.onEdit.bind(null, note.id)}
            onDelete={this.props.onDelete.bind(null, note.id)} />
        </li>
      );
    });
    return <ul className="note-list">{ notes }</ul>;
  }

}

export default NoteList;