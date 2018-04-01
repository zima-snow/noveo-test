import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, ListGroupItem, Glyphicon } from 'react-bootstrap';

class DiskListItem extends Component {
  handleListItemClick = () => {
    const { item, onListItemClick } = this.props;
    if (item.type === 'dir') {
      onListItemClick(item.name);
    }
  };

  render() {
    const { item } = this.props;
    const size = item.size ? `${(item.size / 1024 / 1024).toFixed(2)} МБ` : '';
    return (
      <ListGroupItem
        onClick={this.handleListItemClick}
      >
        <Row>
          <Col lg={2} md={2} sm={2} xs={2}>
            {item.type === 'dir' ?
              <Glyphicon glyph="glyphicon glyphicon-folder-close" />
             : null
            }
          </Col>
          <Col lg={6} md={6} sm={6} xs={6}>
            {item.name}
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            {size}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

DiskListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
  }),
  onListItemClick: PropTypes.func,
};

export default DiskListItem;
