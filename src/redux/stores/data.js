import cloneDeep from 'lodash/cloneDeep';

import * as c from 'src/constants';

const MODULE_PREFIX = 'data/';

export const dataTypes = {
  DATA_LOAD: MODULE_PREFIX + 'DATA_LOAD',
  DATA_LOAD_SUCCESS: MODULE_PREFIX + 'DATA_LOAD_SUCCESS',
  DATA_LOAD_ERROR: MODULE_PREFIX + 'DATA_LOAD_ERROR',
  DATA_LOAD_RESET: MODULE_PREFIX + 'DATA_LOAD_RESET',

  DATA_REQUEST: MODULE_PREFIX + 'DATA_REQUEST',
  DATA_REQUEST_SUCCESS: MODULE_PREFIX + 'DATA_REQUEST_SUCCESS',
  DATA_REQUEST_ERROR: MODULE_PREFIX + 'DATA_REQUEST_ERROR',
  DATA_REQUEST_RESET: MODULE_PREFIX + 'DATA_REQUEST_RESET',
};

export const dataActions = {
  loadData: () => ({
    type: dataTypes.DATA_LOAD,
  }),
  resetData: () => ({
    type: dataTypes.DATA_LOAD_RESET,
  }),
  sendData: (payload, onSuccess) => ({
    type: dataTypes.DATA_REQUEST,
    payload,
    onSuccess,
  }),
};

export const dataSelectors = {
  data: (state) => state.order.data,
  dataLoading: (state) => state.order.dataLoading,
  dataRequesting: (state) => state.order.dataRequesting,
};

const initialState = {
  data: null,
  dataLoading: true,
  dataRequesting: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case dataTypes.DATA_LOAD: {
      return {
        ...state,
        dataLoading: true,
      };
    }
    case dataTypes.DATA_LOAD_SUCCESS: {
      return {
        ...state,
        data: payload,
        dataLoading: false,
      };
    }
    case dataTypes.DATA_LOAD_ERROR: {
      return {
        ...state,
        data: null,
        dataLoading: false,
      };
    }
    case dataTypes.DATA_LOAD_RESET: {
      return {
        ...state,
        data: null,
        dataLoading: false,
      };
    }

    case dataTypes.DATA_REQUEST: {
      return {
        ...state,
        dataRequesting: true,
      };
    }
    case dataTypes.DATA_REQUEST_SUCCESS: {
      return {
        ...state,
        dataRequesting: false,
      };
    }
    case dataTypes.DATA_REQUEST_ERROR: {
      return {
        ...state,
        dataRequesting: false,
      };
    }
    case dataTypes.DATA_REQUEST_RESET: {
      return {
        ...state,
        dataRequesting: false,
      };
    }

    default:
      return state;
  }
};
