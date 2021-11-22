import {takeEvery, put, call} from 'redux-saga/effects';
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from './constants';
import axios from 'axios';
import {changepasswordApi} from '../../utils/api';
function* updatepassRequested({token, oldpass, newpass, success, error}) {
  try {
    const formdata = new FormData();
    formdata.append('oldpassword', oldpass);
    formdata.append('newpassword', newpass);
    formdata.append('c_password', newpass);
    const Data = yield call(axios.post, changepasswordApi, formdata, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.data.response.success === true) {
      yield put({type: UPDATE_PASSWORD_SUCCESS});
      success(Data.data.response.message);
    } else {
      yield put({type: UPDATE_PASSWORD_FAIL});
      success(Data.data.response.message);
    }
  } catch (error) {
    if (error.response) {
      yield put({type: UPDATE_PASSWORD_FAIL});
      success(error.response.data.message);
    } else if (error.request) {
      yield put({type: UPDATE_PASSWORD_FAIL});
      success(error.toString());
    } else {
      yield put({type: UPDATE_PASSWORD_FAIL});
      success('something went wrong !');
    }
  }
}

function* sagaLogin() {
  yield takeEvery(UPDATE_PASSWORD_REQUEST, updatepassRequested);
}
export default sagaLogin;
