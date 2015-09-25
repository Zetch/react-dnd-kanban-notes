import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import LaneList from './LaneList.jsx';


@DragDropContext(HTML5Backend)
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = LaneStore.getState();
    this.storeChanged = this.storeChanged.bind(this);
  }

  // Lifecycle

  componentDidMount() {
    LaneStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    LaneStore.listen(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }

  // Actions

  addLane() {
    LaneActions.create({ name: 'New lane' });
  }

  editLane(id, name) {
    LaneActions.update({ id, name });
  }

  deleteLane(id) {
    LaneActions.delete(id);
  }

  // Rendering

  render() {
    return (
      <div>
        <h1>NoteApp</h1>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <LaneList items={this.state.lanes}
          onEdit={this.editLane}
          onDelete={this.deleteLane} />
      </div>
    );
  }

}

export default App;