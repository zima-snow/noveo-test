import objectAssign from 'object-assign';
import { LOADED_DISK_DATA, START_ACTION, COMPLETE_ACTION } from 'constants/ActionTypes';

const initialState = {
  data: [],
  isLoaded: false,
};

export default function disk(state = initialState, action) {
  switch (action.type) {
    case LOADED_DISK_DATA: {
      return objectAssign({}, state, { data: action.data });
    }
    case START_ACTION: {
      switch (action.actionId) {
        case 'getDiskDataAction': {
          return objectAssign({}, state, { isLoaded: false });
        }
        default: {
          return state;
        }
      }
    }
    case COMPLETE_ACTION: {
      switch (action.actionId) {
        case 'getDiskDataAction': {
          return objectAssign({}, state, { isLoaded: true });
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
}
