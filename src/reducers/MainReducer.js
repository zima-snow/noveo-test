import objectAssign from 'object-assign';
import { FAIL, SUCCESS, RESET_STORES } from '../constants/ActionTypes';

const initialState = {
  error: '',
  success: '',
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case FAIL: {
      return objectAssign({}, state, { error: action.error });
    }
    case SUCCESS: {
      return objectAssign({}, state, { success: action.text });
    }
    case RESET_STORES: {
      return objectAssign({}, state, { error: '', success: '' });
    }
    default: {
      return state;
    }
  }
}
