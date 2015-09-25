import uuid from 'node-uuid';
import alt from '../libs/alt';
import update from 'react/lib/update';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from './NoteStore';


class LaneStore {

  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  attach({laneId, noteId}) {
    if (!noteId) {
      this.waitFor(NoteStore);
      noteId = NoteStore.getState().notes.slice(-1)[0].id;
    }

    const index = this._find(laneId);
    if (index === undefined) return;

    const lanes = this.lanes;
    const lane = this.lanes[index];

    if (lane.notes.indexOf(noteId) === -1) {
      lane.notes.push(noteId);
      this.setState({ lanes });
    }
  }

  detach({laneId, noteId}) {
    const index = this._find(laneId);
    if (index === undefined) return;

    const lanes = this.lanes;
    const lane = this.lanes[index];
    const noteIndex = lane.notes.indexOf(noteId);

    if (noteIndex >= 0) {
      lane.notes = lane.notes.slice(0, noteIndex).concat(lane.notes.slice(noteIndex+1));
      this.setState({ lanes });
    }
  }

  move({sourceId, targetId, laneId}) {
    if (!targetId && !laneId) return;

    const lanes = this.lanes;

    // Set lanes
    const sourceLane = lanes.filter(lane => lane.notes.indexOf(sourceId) >= 0)[0];
    const targetLane = laneId ? lanes[this._find(laneId)] : lanes.filter(lane => lane.notes.indexOf(targetId) >= 0)[0];
    if (!sourceLane || !targetLane) return;

    // Move on note
    if (targetId) {

      // Set notes
      const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      const targetNoteIndex = targetLane.notes.indexOf(targetId);
      if (sourceNoteIndex < 0 || targetNoteIndex < 0) return;

      // Move on lane
      if (sourceLane === targetLane) {
        sourceLane.notes = update(sourceLane.notes, {
          $splice: [
            [sourceNoteIndex, 1],
            [targetNoteIndex, 0, sourceId]
          ]
        });

      // Move to other lane
      } else {
        sourceLane.notes.splice(sourceNoteIndex, 1);
        targetLane.notes.splice(targetNoteIndex, 0, sourceId);
      }

      // Update
      this.setState({ lanes });

    // Move to lane
    } else {

      // Set note
      const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      if (sourceNoteIndex < 0) return;

      sourceLane.notes.splice(sourceNoteIndex, 1);
      targetLane.notes.push(sourceId);

      // Update
      this.setState({ lanes });
    }

  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];
    this.setState({ lanes: lanes.concat(lane) });
  }

  update({id, name}) {
    let lanes = this.lanes;
    const index = this._find(id);
    if (index >= 0) {
      lanes[index].name = name;
      this.setState({ lanes });
    }
  }

  delete(id) {
    let lanes = this.lanes;
    const index = this._find(id);
    if (index >= 0) {
      //lanes[index].notes.forEach(id => NoteActions.delete(id));
      lanes = lanes.slice(0, index).concat(lanes.slice(index+1));
      this.setState({ lanes });
    }
  }

  retrieve(id) {
    const index = this._find(id);
    if (index >= 0) return this.lanes[index];
  }

  _find(id) {
    return this.lanes.findIndex((lane) => lane.id === id);
  }

}

export default alt.createStore(LaneStore, 'LaneStore');