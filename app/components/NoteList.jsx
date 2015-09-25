import React from 'react';
import Note from './Note.jsx';
import './NoteList.css';


class NoteList extends React.Component {

  render() {
    const notes = this.props.items.map(note => {
      return (
        <Note
          key={`note-${note.id}`}
          id={note.id}
          task={note.task}
          onMove={this.props.onMove}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)} />
      );
    });
    return <div className="note-list">{ notes }</div>;
  }

}

export default NoteList;