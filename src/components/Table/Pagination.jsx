import React from 'react';
import { Pagination, DropdownButton, MenuItem, Row, Col, Grid } from 'react-bootstrap';

import styles from './Table.css';

class PaginationDaz extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activePage: props.activePage || 1,
      per_page: props.per_page || 25,
      total: Math.ceil(props.total / props.per_page) ||0,
    }
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    },() => {
      this.props.callUpdatePage(this.state.activePage);
    });
  }

  handlePerPage(eventKey){
    this.setState({
      per_page: eventKey
    },() => {
      this.props.callUpdatePerPage(this.state.per_page);
    });
  }

  render(){
    return(
    <div>
      <div className={styles.menu}>
        <DropdownButton
          title={this.state.per_page}
          onSelect={this.handlePerPage.bind(this)}
          dropup
          id="Show_per_page"
        >
          <MenuItem eventKey="25" active={(this.state.per_page == "25"? true: false)}>
            25
          </MenuItem>
          <MenuItem eventKey="50" active={(this.state.per_page == "50"? true: false)}>
            50
          </MenuItem>
          <MenuItem eventKey="100" active={(this.state.per_page == "100"? true: false)}>
            100
          </MenuItem>
        </DropdownButton>
      </div>
      <div className={styles.menuRight}>
        <Pagination
          ellipsis
          boundaryLinks
          bsSize="medium"
          if="pagination"
          className={styles.pagination}
          items={this.state.total}
          maxButtons={6}
          activePage={this.state.activePage}
          onSelect={this.handleSelect.bind(this)}
        />
      </div>
    </div>
    );
  }

}

export default PaginationDaz;
