// import { call, put, takeLatest } from 'redux-saga/effects';
// import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } from './tasksSlice';
// import { fetchTasksApi } from '../../services/api';

// function* fetchTasksSaga() {
//   try {
//     const response = yield call(fetchTasksApi);
//     yield put(fetchTasksSuccess(response));
//   } catch (error) {
//     yield put(fetchTasksFailure(error.message));
//   }
// }

// export default function* tasksSaga() {
//   yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
// }







import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure,
  createTaskRequest, createTaskSuccess, createTaskFailure,
  updateTaskRequest, updateTaskSuccess, updateTaskFailure,
  deleteTaskRequest, deleteTaskSuccess, deleteTaskFailure
} from './tasksSlice';
import {
  fetchTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from '../../services/api';

function* fetchTasksWorker() {
  try {
    const data: any = yield call(fetchTasksApi);
    yield put(fetchTasksSuccess(data));
  } catch (error: any) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* createTaskWorker(action: any) {
  try {
    const { projectId, title, description, status, dueDate } = action.payload;
    const newTask: any = yield call(createTaskApi, projectId, { title, description, status, dueDate });
    yield put(createTaskSuccess(newTask));
    yield put(fetchTasksRequest());
  } catch (error: any) {
    yield put(createTaskFailure(error.message));
  }
}

function* updateTaskWorker(action: any) {
  try {
    const { id, projectId, title, description, status, dueDate } = action.payload;
    const updated: any = yield call(updateTaskApi, id, { projectId, title, description, status, dueDate });
    yield put(updateTaskSuccess(updated));
    yield put(fetchTasksRequest());
  } catch (error: any) {
    yield put(updateTaskFailure(error.message));
  }
}

function* deleteTaskWorker(action: any) {
  try {
    const id: string = action.payload;
    yield call(deleteTaskApi, id);
    yield put(deleteTaskSuccess(id));
  } catch (error: any) {
    yield put(deleteTaskFailure(error.message));
  }
}

export default function* tasksSaga() {
  yield all([
    takeLatest(fetchTasksRequest.type, fetchTasksWorker),
    takeLatest(createTaskRequest.type, createTaskWorker),
    takeLatest(updateTaskRequest.type, updateTaskWorker),
    takeLatest(deleteTaskRequest.type, deleteTaskWorker),
  ]);
}