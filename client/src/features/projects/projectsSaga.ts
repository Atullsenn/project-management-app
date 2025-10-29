import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProjectsRequest, fetchProjectsSuccess, fetchProjectsFailure, createProjectRequest,
  createProjectSuccess,
  createProjectFailure,updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure, } from './projectsSlice';
import { fetchProjectsApi, createProjectApi, updateProjectApi, deleteProjectApi } from '../../services/api';
import { PayloadAction } from '@reduxjs/toolkit';


function* fetchProjectsSaga() {
  try {
    const response:any = yield call(fetchProjectsApi);
    console.log('Fetch Projects API Response:', response);
    yield put(fetchProjectsSuccess(response.data));
  } catch (error:any) {
    yield put(fetchProjectsFailure(error.message));
  }
}



function* createProjectSaga(action: PayloadAction<{title: string; description: string; status: string;}>) {
  try {
    const response:any = yield call(createProjectApi, action.payload);
    yield put(createProjectSuccess(response.data));
  } catch (error: any) {
    yield put(createProjectFailure(error.message));
  }
}



function* updateProjectSaga(action: ReturnType<typeof updateProjectRequest>) {
  try {
    const { id, title, description, status } = action.payload;
    const response:any = yield call(updateProjectApi, id, { title, description, status });
    yield put(updateProjectSuccess(response.data));
  } catch (error: any) {
    yield put(updateProjectFailure(error.message));
  }
}

function* deleteProjectSaga(action: ReturnType<typeof deleteProjectRequest>) {
  try {
    const id = action.payload;
    yield call(deleteProjectApi, id);
    yield put(deleteProjectSuccess(id));
  } catch (error: any) {
    yield put(deleteProjectFailure(error.message));
  }
}

export default function* projectsSaga() {
  yield takeLatest(fetchProjectsRequest.type, fetchProjectsSaga);
  yield takeLatest(createProjectRequest.type, createProjectSaga);
  yield takeLatest(updateProjectRequest.type, updateProjectSaga);
  yield takeLatest(deleteProjectRequest.type, deleteProjectSaga);
}



