import {
  failEvent, successEvent,
  startActionEvent, completeActionEvent,
} from 'events/MainEvents';

import axios from 'axios';
import Promise from 'es6-promise';
import * as types from 'constants/ActionTypes';
import { forEach } from 'lodash';

import { SERVICE_UNAVAILABLE, API_PATH, API_TOKEN } from '../constants';

const getAjaxReqObject = (url, method, params) => {
  const result = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `OAuth ${API_TOKEN}`,
    },
  };
  switch (method) {
    case 'POST': {
      result.url = `${API_PATH}${url}`;
      result.data = params;
      break;
    }
    default: { // GET is default method
      let strParams = '?';
      forEach(Object.keys(params), (item) => {
        strParams += `${item}=${params[item]}&`;
      });
      result.url = `${API_PATH}${url}${strParams}`;
      break;
    }
  }
  return result;
};

const ajaxReq = (url, method = 'GET', params = {}) => {
  const promise = new Promise((successFunc, failFunc) => {
    const ajaxReqObject = getAjaxReqObject(url, method, params);
    axios(ajaxReqObject)
      .then((result) => {
        if (!result.data._embedded.items) { // eslint-disable-line
          failFunc(SERVICE_UNAVAILABLE);
          return;
        }
        successFunc(result.data._embedded.items); // eslint-disable-line
      })
      .catch((result) => {
        if (result.response.data) {
          failFunc(result.response.data.message);
          return;
        }
        failFunc(SERVICE_UNAVAILABLE);
      });
  });
  return promise;
};

function commonEvent(typeEvent, data, eventParams = {}) {
  return {
    type: typeEvent,
    data,
    ...eventParams,
  };
}

const commonAction = ({
  url, method, params, dispatch,
  typeEvent, eventParams, successMessage, actionId,
}) => {
  const res = ajaxReq(url, method, params);
  if (dispatch) {
    dispatch(startActionEvent(actionId));
    res.then(
      (data) => {
        if (data !== null && typeEvent) {
          dispatch(commonEvent(typeEvent, data, eventParams));
        }
        if (successMessage) {
          dispatch(successEvent(successMessage));
        }
        dispatch(completeActionEvent(actionId, true));
      },
      (error) => {
        dispatch(failEvent(error));
        dispatch(completeActionEvent(actionId, false));
      },
    );
  }
  return res;
};


export const getDiskDataAction = ({ method, params, dispatch }) => {
  const res = commonAction({
    url: '/disk/resources',
    method,
    params,
    dispatch,
    typeEvent: types.LOADED_DISK_DATA,
    successMessage: 'Загрузка выполнена успешно',
    actionId: 'getDiskDataAction',
  });
  return res;
};

export const stub = () => {};
