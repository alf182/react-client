import React from 'react';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';

import Row from './RowTable';
import Head from './HeadTable';
import PaginationDaz from './Pagination';
import styles from './Table.css';

class TableDaz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.objects || null,
      header: props.data.meta || null,
      data_ref: props.data_ref || null,
      data_path: props.data_path || null,
      pagination:props.pagination,
      per_page: props.per_page || 25,
      activePage: props.page || 1,
      no_data: props.no_data || 'Aún no existen registros',
    };
  }

  updatePerPage(per_page){
    this.setState({
      per_page
    },() => {
      this.props.callUpdateData(this.state.per_page);
    });
  }

  updatePage(activePage){
    this.setState({
      activePage
    },() => {
      this.props.callUpdateDataPage(this.state.activePage);
    });
  }

  render() {
    return (
      <div>
        <Table responsive
          hover="True"
          fill
          key="generic">
          <Head
            data_head={this.state.header.columns}
          />
          <tbody>
          {this.state.header.totalCount > 0 && this.state.data
            .map((data, i) => <Row data_row={data} key={i} data_ref={this.state.data_ref} data_path={this.state.data_path} />)
          }
          {this.state.header.totalCount == 0 &&
            <tr>
              <td colSpan={this.state.header.columns.length} >
                <div className={styles.noData}>
                  {this.state.no_data}
                </div>
              </td>
            </tr>
          }
          </tbody>
        </Table>
        { this.state.pagination && this.state.header.totalCount > 0 &&
          <PaginationDaz
            per_page={this.state.per_page}
            callUpdatePerPage={this.updatePerPage.bind(this)}
            callUpdatePage={this.updatePage.bind(this)}
            total={this.state.header.totalCount}
            activePage={this.state.activePage}
          />
        }
      </div>
    );
  }
}

export default TableDaz;
