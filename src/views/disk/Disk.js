import { getDiskDataAction } from 'services/WebAPI';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col, ListGroup, Button, Glyphicon } from 'react-bootstrap';
import Loader from 'react-loader';
import { map } from 'lodash';

import DiskListItem from './components/DiskListItem';
import { LIMIT_FILES } from '../../constants';
import { RESET_STORES } from '../../constants/ActionTypes';

const DiskListGroup = ({ data, handleListItemClick }) => {
  const listItems = map(data, (item) => {
    const listItem = (
      <DiskListItem
        key={item.resource_id}
        item={item}
        onListItemClick={handleListItemClick}
      />
    );
    return listItem;
  });
  const result = (
    <ListGroup>
      {listItems}
    </ListGroup>
  );
  return result;
};

class Disk extends Component {
  constructor(props) {
    super(props);
    this.prevPath = '';
    this.state = {};
  }

  componentWillMount() {
    this.reset();
    this.getDiskInfo('/');
    document.location.hash = '/';
  }

  getDiskInfo = (path) => {
    const { getDiskData } = this.props;
    getDiskData({
      path,
      limit: LIMIT_FILES,
    });
  };

  reset = () => {
    const { resetStore } = this.props;
    resetStore();
  };

  handleListItemClick = (name) => {
    this.reset();
    const path = `${document.location.hash}${name}/`.substr(1);
    this.getDiskInfo(path);
    this.prevPath = document.location.hash.substr(1);
    document.location.hash = path;
  };

  handleLevelUpClick = () => {
    this.reset();
    const strArr = document.location.hash.slice(1, -1).split('/');
    let path = '';
    for (let i = 0, l = strArr.length; i < l - 1; i += 1) {
      path += `${strArr[i]}/`;
    }
    this.getDiskInfo(path);
    document.location.hash = path;
  };

  render() {
    const { data, isLoaded } = this.props;
    return (
      <div>
        <Row>
          <Col lg={10} md={10} sm={12} xs={12} lgOffset={1} mdOffset={1} className="noveo__main-block">
            <h1>
              Список файлов Яндекс.Диска
            </h1>
            <hr />
            <Row>
              <Col lg={2} md={2} sm={2} xs={2}>
                {document.location.hash !== '#/' ? (
                  <Button
                    type="button"
                    onClick={this.handleLevelUpClick}
                    className="noveo__button"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-level-up" />
                  </Button>
                ) : null
                }
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h4>
                  Имя
                </h4>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <h4>
                  Размер
                </h4>
              </Col>
            </Row>
            <Loader loaded={isLoaded}>
              <DiskListGroup
                data={data}
                handleListItemClick={this.handleListItemClick}
              />
            </Loader>
          </Col>
        </Row>
      </div>
    );
  }
}

Disk.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoaded: PropTypes.bool,
  getDiskData: PropTypes.func,
  resetStore: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    data: state.disk.data,
    isLoaded: state.disk.isLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDiskData: params => getDiskDataAction({ dispatch, params }),
    resetStore: () => dispatch({ type: RESET_STORES }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Disk);
