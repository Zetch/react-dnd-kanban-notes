import React from 'react';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import NoteList from './NoteList.jsx';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import classNames  from 'classnames';
import './Lane.css';


const laneTarget = {
  drop(props, monitor) {
    const source = monitor.getItem();
    if (props.notes.indexOf(source.id) < 0) {
      LaneActions.move({ sourceId: source.id, laneId: props.id });
    }
  },

  canDrop(props, monitor) {
    const source = monitor.getItem();
    return props.notes.indexOf(source.id) < 0;
  }
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


@DropTarget(ItemTypes.NOTE, laneTarget, collectDrop)
class Lane extends React.Component {

  constructor(props) {
    super(props);
    this.state = NoteStore.getState();
    this.storeChanged = this.storeChanged.bind(this);

    this.addNote = this.addNote.bind(this, props.id);
    this.deleteNote = this.deleteNote.bind(this, props.id);
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

  addNote(laneId) {
    NoteActions.create({ task: 'New task' });
    LaneActions.attach({ laneId });
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(laneId, noteId) {
    NoteActions.delete(noteId);
    LaneActions.detach({ laneId, noteId });
  }

  moveNote({sourceId, targetId}) {
    LaneActions.move({sourceId, targetId});
  }

  // Rendering

  render() {
    return (
      <div className="lane">
        { this.props.connectDropTarget(
          <div className={classNames({
            'lane-header': true,
            'lane-header--hovered': this.props.isOver,
            'lane-header--forbidden': !this.props.canDrop && this.props.isOver
          })}>
            <div className="lane-name">
              <Editable value={this.props.name} onEdit={this.props.onEdit} />
            </div>
            <button className="add-note" onClick={this.addNote}>+</button>
            <button className="delete" onClick={this.props.onDelete}>X</button>
          </div>
        ) }
        <NoteList
          items={NoteStore.retrieve(this.props.notes)}
          onMove={this.moveNote}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }

}

export default Lane;