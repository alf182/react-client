import React from 'react';
import { withRouter } from 'react-router';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_row: props.data_row,
      data_ref: props.data_ref,
      data_path: props.data_path,
    };
  }

  static propTypes : {
    location: PropTypes.object.isRequired
  }

  linked(){
    let principal_key = this.props.data_row[this.state.data_ref];
    if(this.state.data_path !== null && this.state.data_path !== undefined ){
      console.log("redireccionar");
      this.props.push(`${this.state.data_path}/${principal_key}`);
    }
  }

  render() {
    return (
      <tr onClick={this.linked.bind(this)}>
        {Object.keys(this.state.data_row)
          .map(i => <td>{(i!="NUMREG" && i!="MY_RNUM")?this.state.data_row[i]:undefined}</td>)
        }
      </tr>
    );
  }

  /*
  render() {
        console.log(this.state.data_row);
        return (
            <tr>
                <Cell data_cell={this.state.data_row.id} />
            </tr>
        );
        return (
      <tr onClick={this.linked.bind(this)}>
        {Object.keys(this.state.data_row)
          .map(i => i == this.state.data_ref ?<td> <Link to={`/employee/${this.state.data_row[i]}`}> {this.state.data_row[i]}</Link></td>: <td>{this.state.data_row[i]}</td>)
        }
      </tr>
    );
  }*/
}

export default withRouter(Row);
