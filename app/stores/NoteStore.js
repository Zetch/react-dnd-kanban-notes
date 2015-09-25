import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {

  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];

    this.exportPublicMethods({
      retrieve: this.retrieve.bind(this)
    });
  }

  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();
    this.setState({ notes: notes.concat(note) });
  }

  retrieve(ids) {
    return (ids || []).map(id => this.notes[this._find(id)]).filter(note => note);
  }

  update({id, task}) {
    let notes = this.notes;
    const index = this._find(id);
    if (index >= 0) {
      notes[index].task = task;
      this.setState({ notes });
    }
  }

  delete(id) {
    let notes = this.notes;
    const index = this._find(id);
    if (index >= 0) {
      notes = notes.slice(0, index).concat(notes.slice(index+1));
      this.setState({ notes });
    }
  }

  _find(id) {
    return this.notes.findIndex((note) => note.id === id);
  }

}

export default alt.createStore(NoteStore, 'NoteStore');