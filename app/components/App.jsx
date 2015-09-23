import React from 'react';
import NoteList from './NoteList.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = NoteStore.getState();
    this.storeChanged = this.storeChanged.bind(this);
  }

  // Lifecycle

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.listen(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }

  // Actions

  addNote() {
    NoteActions.create({ task: 'New task' });
  }

  editNote(id, task) {
    NoteActions.update({ id, task });
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  // Rendering

  render() {
    return (
      <div>
        <h1>NoteApp</h1>
        <button className='add-note' onClick={this.addNote}>+</button>
        <NoteList tasks={this.state.notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    );
  }

}

export default App;