import { combineReducers } from 'redux';

import disk from 'views/disk/DiskReducer';

import main from './MainReducer';

const reducers = combineReducers({
  main,
  disk,
});

export default reducers;
