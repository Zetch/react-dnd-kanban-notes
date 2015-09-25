import React from 'react';
import Editable from './Editable.jsx';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import './Note.css';
import classNames  from 'classnames';


const noteSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const noteTarget = {
  drop(props, monitor) {
    const source = monitor.getItem();
    if (props.id !== source.id) {
      props.onMove({ sourceId: source.id, targetId: props.id });
    }
  }
}

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver()
  };
}


@DragSource(ItemTypes.NOTE, noteSource, collectDrag)
@DropTarget(ItemTypes.NOTE, noteTarget, collectDrop)
class Note extends React.Component {

  render() {
    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className={classNames({
        'note': true,
        'note--dragging': this.props.isDragging,
        'note--hovered': this.props.hovered
      })}>
        <Editable value={this.props.task} onEdit={this.props.onEdit} />
        <button className="delete" onClick={this.props.onDelete}>X</button>
      </div>
    ));
  }

}

export default Note;