import {takeEvery, put, call} from 'redux-saga/effects';
import {FORGOT_FAIL, FORGOT_REQUEST, FORGOT_SUCCESS} from './constants';
import axios from 'axios';
import {forgotpasswordApi} from '../../utils/api';

function* onLoginRequested({email, success, error}) {
  try {
    const formdata = new FormData();
    formdata.append('email', email);
    const Data = yield call(axios.post, forgotpasswordApi, formdata);

    if (Data.data.response.success === true) {
      yield put({type: FORGOT_SUCCESS});
      success('1', Data.data.response);
    } else {
      yield put({type: FORGOT_FAIL});
      success('2', Data.data.response);
    }
  } catch (error) {
    yield put({type: FORGOT_FAIL});
    success('3', 'Something went wrong');
  }
}

function* sagaLogin() {
  yield takeEvery(FORGOT_REQUEST, onLoginRequested);
}
export default sagaLogin;
