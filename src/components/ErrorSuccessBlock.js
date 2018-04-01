import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import { TIME_ERROR_SUCCESS_MESSAGE_DURATION } from '../constants';

class ErrorSuccessBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;
    if (nextProps.isOpen !== isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
      setTimeout(() => {
        this.setState({ isOpen: false });
      }, TIME_ERROR_SUCCESS_MESSAGE_DURATION);
    }
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { className, message } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) return null;
    return (
      <Row>
        <Col lg={10} md={10} sm={12} xs={12} lgOffset={1} mdOffset={1} className={className}>
          <Col lg={10} md={10} sm={10} xs={10}>
            {message}
          </Col>
          <Col lg={2} md={2} sm={2} xs={2}>
            <Button
              type="button"
              onClick={this.handleCloseClick}
              className="noveo__button"
              bsSize="lg"
            >
              Закрыть
            </Button>
          </Col>
        </Col>
      </Row>
    );
  }
}

ErrorSuccessBlock.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  message: PropTypes.string,
};

export default ErrorSuccessBlock;
