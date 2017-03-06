import React from 'react';

class HeadTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_head: props.data_head || null,
    };
  }
  render() {
    return (
      <thead>
        <tr>
          {Object.keys(this.state.data_head)
            .map(i => <th key={`head${i}`}>{this.state.data_head[i].alias}</th>)
          }
        </tr>
      </thead>
    );
  }
}

export default HeadTable;
