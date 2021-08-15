import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { isdev } from 'src/config';
import rootStore from './stores';
import indexSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeSetup = isdev ? composeWithDevTools : compose;

const initialState = {};
const middleware = [sagaMiddleware];
const store = createStore(
  rootStore,
  initialState,
  composeSetup(applyMiddleware(...middleware)),
);

sagaMiddleware.run(indexSaga);

export default store;
