import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ErrorSuccessBlock from 'components/ErrorSuccessBlock';

import Disk from './disk';
import './Default.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { error, success } = this.props;
    return (
      <Fragment>
        <Disk />
        <ErrorSuccessBlock
          className={cx({
            'noveo__error-block': !!error,
            'noveo__success-block': !!success,
          })}
          isOpen={!!error || !!success}
          message={error || success || ''}
        />
      </Fragment>
    );
  }
}

App.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    error: state.main.error,
    success: state.main.success,
  };
}

export default connect(mapStateToProps)(App);
