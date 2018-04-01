import * as types from '../constants/ActionTypes';

export function startActionEvent(actionId) {
  return {
    type: types.START_ACTION,
    actionId,
  };
}

export function completeActionEvent(actionId, isSuccess = true) {
  return {
    type: types.COMPLETE_ACTION,
    actionId,
    isSuccess,
  };
}

export function failEvent(error, actionId) {
  return {
    type: types.FAIL,
    error,
    actionId,
  };
}

export function successEvent(text, actionId) {
  return {
    type: types.SUCCESS,
    text,
    actionId,
  };
}
