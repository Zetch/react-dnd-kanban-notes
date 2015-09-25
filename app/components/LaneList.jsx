import React from 'react';
import Lane from './Lane.jsx';

class LaneList extends React.Component {

  render() {
    const lanes = this.props.items.map(lane => {
      return <Lane {...lane}
        key={`lane-${lane.id}`}
        onEdit={this.props.onEdit.bind(this, lane.id)}
        onDelete={this.props.onDelete.bind(this, lane.id)} />;
    });
    return <div className="lane-list">{ lanes }</div>;
  }

}

export default LaneList;