import { all, fork } from 'redux-saga/effects';

import {
  createLoadingSaga,
  createRequestingSaga,
} from 'src/helpers/createSaga';
import { dataTypes } from 'src/redux/stores/data';

function* rootWatcher() {
  yield all([
    fork(
      createLoadingSaga({
        sagaName: 'order',
        handlerName: 'get subscription plans',
        url: 'https://cloud-storage-prices-moberries.herokuapp.com/prices',
        watchType: dataTypes.DATA_LOAD,
        successType: dataTypes.DATA_LOAD_SUCCESS,
        errorType: dataTypes.DATA_LOAD_ERROR,
        resetTypes: [dataTypes.DATA_LOAD_RESET],
      }),
    ),
    fork(
      createRequestingSaga({
        sagaName: 'order',
        handlerName: 'post order',
        url: 'https://httpbin.org/post',
        watchType: dataTypes.DATA_REQUEST,
        successType: dataTypes.DATA_REQUEST_SUCCESS,
        errorType: dataTypes.DATA_REQUEST_ERROR,
        resetTypes: [dataTypes.DATA_REQUEST_RESET],
      }),
    ),
  ]);
}

export default rootWatcher;
