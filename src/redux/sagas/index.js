import { all } from 'redux-saga/effects';
import data from './data';

export default function* indexSaga() {
  yield all([data()]);
}
