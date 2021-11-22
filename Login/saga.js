import {takeEvery, put, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from './constants';
import axios from 'axios';
import {LoginApi} from '../../utils/api';

function* onLoginRequested({
  email,
  password,
  success,
  devicetoken,
  devicetype,
  error,
}) {
  try {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('device_type', devicetype);
    formdata.append('device_token', devicetoken);
    const Data = yield call(axios.post, LoginApi, formdata);
    if (Data.data.success === true) {
      yield put({type: LOGIN_SUCCESS});
      success('1', Data.data);
    } else {
      yield put({type: LOGIN_FAIL});
      success('2', Data.data);
    }
  } catch (error) {
    if (error.response) {
      yield put({type: LOGIN_FAIL});
      success('3', error.response.data.message);
    } else if (error.request) {
      yield put({type: LOGIN_FAIL});
      success('3', error.toString());
    } else {
      yield put({type: LOGIN_FAIL});
      success('3', 'something went wrong !');
    }
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN_REQUEST, onLoginRequested);
}
export default sagaLogin;
