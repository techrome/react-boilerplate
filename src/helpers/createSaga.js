import axios from 'axios';
import {
  takeLatest,
  call,
  put,
  cancelled,
  all,
  takeEvery,
  take,
  cancel,
} from 'redux-saga/effects';

import { defaultErrorText, isdev } from 'src/config';
import { alertsActions } from 'src/redux/stores/alerts';

export function createLoadingSaga({
  url = '',
  watchType,
  successType,
  errorType,
  resetTypes = [],
  isParallel = false,
  sagaName,
  handlerName,
  modifyResponse,
}) {
  const checkError = (err) => {
    let result = {
      isErrorValid: false,
      errorText: defaultErrorText,
    };

    isdev && console.log(`err from ${sagaName} ${handlerName} handler`, err);

    if (err && err.message && !err.response) {
      isdev &&
        console.error(
          `err.message from ${sagaName} ${handlerName} handler!`,
          err.message,
        );

      result.errorText = err.message || defaultErrorText;

      return result;
    }

    if (!err || !err.response) {
      isdev &&
        console.error(
          `no err or err.response from ${sagaName} ${handlerName} handler!`,
        );

      return result;
    }

    isdev &&
      console.log(
        `err.response from ${sagaName} ${handlerName} handler`,
        err.response,
      );

    result.isErrorValid = true;
    result.errorText = err.response.data || defaultErrorText;

    return result;
  };

  function* api({ action, cancelToken }) {
    try {
      const _url = typeof url === 'function' ? url(action) : url;
      const res = yield axios.get(_url, { cancelToken });

      isdev && console.log(`response from ${sagaName} ${handlerName} api`, res);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  function* handler(action) {
    if (resetTypes.includes(action.type)) {
      // to stop currently running saga(s)
      return;
    }

    const cancelSource = axios.CancelToken.source();
    try {
      const response = yield call(api, {
        action,
        cancelToken: cancelSource.token,
      });

      yield put({
        type: successType,
        payload: modifyResponse ? modifyResponse(response, action) : response,
      });
    } catch (err) {
      const { isErrorValid, errorText } = checkError(err);

      if (!isErrorValid) {
        yield all([
          put({
            type: errorType,
            payload: {},
          }),
          put(
            alertsActions.addAlert({
              message: errorText,
              options: {
                variant: 'error',
              },
            }),
          ),
        ]);
        return;
      }

      switch (err.response.status) {
        default: {
          yield all([
            put({
              type: errorType,
              payload: {},
            }),
            put(
              alertsActions.addAlert({
                message: errorText,
                options: {
                  variant: 'error',
                },
              }),
            ),
          ]);
          break;
        }
      }
    } finally {
      if (yield cancelled()) {
        yield call(cancelSource.cancel);
      }
    }
  }

  function* watcher() {
    yield takeLatest([watchType, ...resetTypes], handler);
  }

  function* parallelWatcher() {
    while (true) {
      let workerTask = yield takeEvery(watchType, handler);
      yield take(resetTypes);
      yield cancel(workerTask);
    }
  }

  return isParallel ? parallelWatcher : watcher;
}

// REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING
// REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING
// REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING
// REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING REQUESTING

export function createRequestingSaga({
  url = '',
  method = 'post',
  watchType,
  successType,
  errorType,
  resetTypes = [],
  isParallel = false,
  sagaName,
  handlerName,
  modifyPayload,
  modifyResponse,
  withValidation,
  localValidate,
  isFormData,
}) {
  const checkError = (err) => {
    let result = {
      isErrorValid: false,
      errorText: defaultErrorText,
    };

    isdev && console.log(`err from ${sagaName} ${handlerName} handler`, err);

    if (err && err.message && !err.response) {
      isdev &&
        console.error(
          `err.message from ${sagaName} ${handlerName} handler!`,
          err.message,
        );

      result.errorText = err.message || defaultErrorText;

      return result;
    }

    if (!err || !err.response) {
      isdev &&
        console.error(
          `no err or err.response from ${sagaName} ${handlerName} handler!`,
        );

      return result;
    }

    isdev &&
      console.log(
        `err.response from ${sagaName} ${handlerName} handler`,
        err.response,
      );

    result.isErrorValid = true;
    result.errorText = err.response.data || defaultErrorText;

    return result;
  };

  function* api({ payload, action, cancelToken }) {
    try {
      const _url = typeof url === 'function' ? url(action) : url;
      const _method = typeof method === 'function' ? method(action) : method;
      let res;
      if (['get', 'delete'].includes(_method)) {
        res = yield axios[_method](_url, { cancelToken });
      } else {
        res = yield axios[_method](_url, payload, {
          cancelToken,
          ...(isFormData && {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        });
      }

      isdev && console.log(`res from ${sagaName} ${handlerName} api`, res);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  function* handler(action) {
    if (resetTypes.includes(action.type)) {
      // to stop currently running saga(s)
      return;
    }

    const cancelSource = axios.CancelToken.source();
    try {
      if (localValidate) {
        const localValidations = localValidate(action.payload, action);

        if (localValidations) {
          yield put({
            type: errorType,
            payload: {
              validations: localValidations,
            },
          });
          return;
        }
      }

      const originalResponse = yield call(api, {
        payload: modifyPayload
          ? modifyPayload(action.payload, action)
          : action.payload,
        action,
        cancelToken: cancelSource.token,
      });

      const response = modifyResponse
        ? modifyResponse(originalResponse, action)
        : originalResponse;

      yield put({
        type: successType,
        payload: response,
      });
      if (yield cancelled()) {
        return;
      }
      action.onSuccess?.(response, action, originalResponse);
    } catch (err) {
      const { isErrorValid, errorText } = checkError(err);

      if (!isErrorValid) {
        yield all([
          put({
            type: errorType,
            payload: {},
          }),
          put(
            alertsActions.addAlert({
              message: errorText,
              options: {
                variant: 'error',
              },
            }),
          ),
        ]);
        return;
      }

      switch (err.response.status) {
        default: {
          yield all([
            put({
              type: errorType,
              payload: {},
            }),
            put(
              alertsActions.addAlert({
                message: errorText,
                options: {
                  variant: 'error',
                },
              }),
            ),
          ]);
          break;
        }
      }
    } finally {
      if (yield cancelled()) {
        yield call(cancelSource.cancel);
      }
    }
  }

  function* watcher() {
    yield takeLatest([watchType, ...resetTypes], handler);
  }

  function* parallelWatcher() {
    while (true) {
      let workerTask = yield takeEvery(watchType, handler);
      yield take(resetTypes);
      yield cancel(workerTask);
    }
  }

  return isParallel ? parallelWatcher : watcher;
}
