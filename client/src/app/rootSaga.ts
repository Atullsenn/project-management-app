import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import projectsSaga from '../features/projects/projectsSaga';
import tasksSaga from '../features/tasks/tasksSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([authSaga(), projectsSaga(), tasksSaga(), dashboardSaga()]);
}
