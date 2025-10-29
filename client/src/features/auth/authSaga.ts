import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import { loginApi, registerApi } from "../../services/api";

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const credentials = action.payload;
    const response:any = yield call(registerApi, credentials);
    yield put(
      registerSuccess({
        email: response.email,
        token: response.accessToken || response.token,
      })
    );
    
  } catch (error: any) {
    yield put(registerFailure(error?.message || "Registration failed"));
  }
}

function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const response:any = yield call(loginApi, action.payload);
    // console.log('Login response:', response);
    yield put(
      loginSuccess({ email: response.email, token: response.accessToken })
    );
  } catch (error: string | any) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, handleRegister);
}
