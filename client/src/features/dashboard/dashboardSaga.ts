import { call, put, takeLatest } from 'redux-saga/effects';
import {fetchDashboard} from '../../services/api';
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from './dashboardSlice';

function* fetchDashboardSaga() {
  try {
    const response = yield call(fetchDashboard);
    const payload = response;
    yield put(fetchDashboardSuccess(payload));
  } catch (error: any) {
    yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, fetchDashboardSaga);
}
