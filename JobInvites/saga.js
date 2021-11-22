import {takeEvery, put, call} from 'redux-saga/effects';
import {
  JOBS_INVITE_REQUEST,
  JOBS_INVITE_SUCCESS,
  JOBS_INVITE_FAIL,
  NEXT_JOBS_INVITE_FAIL,
  NEXT_JOBS_INVITE_REQUEST,
  NEXT_JOBS_INVITE_SUCCESS,
  REFRESH_JOBS_INVITE_FAIL,
  REFRESH_JOBS_INVITE_REQUEST,
  REFRESH_JOBS_INVITE_SUCCESS,
  JOB_REJECT_INVITE_FAIL,
  JOB_REJECT_INVITE_REQUEST,
  JOB_REJECT_INVITE_SUCCESS,
  JOB_ACCEPT_INVITE_FAIL,
  JOB_ACCEPT_INVITE_REQUEST,
  JOB_ACCEPT_INVITE_SUCCESS,
} from './constants';
import axios from 'axios';
import {jobinvitesApi, rejectinviteApi, acceptinviteApi} from '../../utils/api';

function* onacceptRequested({
  token,
  success,
  id,
  vid,
  successOne,
  successTwo,
  error,
}) {
  try {
    const formdata = new FormData();
    formdata.append('job_id', id);
    formdata.append('carrier_vehicle_id', vid);
    const Data = yield call(axios.post, acceptinviteApi, formdata, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (Data.status === 200) {
      yield put({type: JOB_ACCEPT_INVITE_SUCCESS});
      success(Data.data.message);
      successOne(token, successTwo);
    } else {
      yield put({type: JOB_ACCEPT_INVITE_FAIL});
      success(Data.data.message);
    }
  } catch (error) {
    if (error.response) {
      yield put({type: JOB_ACCEPT_INVITE_FAIL});
      success(error.response.data.message);
    } else if (error.request) {
      yield put({type: JOB_ACCEPT_INVITE_FAIL});
      success(error.toString());
    } else {
      yield put({type: JOB_ACCEPT_INVITE_FAIL});
      success('something went wrong !');
    }
  }
}

function* onrejectRequested({
  token,
  success,
  id,
  successOne,
  successTwo,
  error,
}) {
  try {
    const formdata = new FormData();
    formdata.append('job_id', id);
    const Data = yield call(axios.post, rejectinviteApi, formdata, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (Data.status === 200) {
      yield put({type: JOB_REJECT_INVITE_SUCCESS});
      successOne(token, successTwo);
      success(Data.data.message);
    } else {
      yield put({type: JOB_REJECT_INVITE_FAIL});
      success(Data.data.message);
    }
  } catch (error) {
    if (error.response) {
      yield put({type: JOB_REJECT_INVITE_FAIL});
      success(error.response.data.message);
    } else if (error.request) {
      yield put({type: JOB_REJECT_INVITE_FAIL});
      success(error.toString());
    } else {
      yield put({type: JOB_REJECT_INVITE_FAIL});
      success('something went wrong !');
    }
  }
}

function* onallrefreshRequested({token, success, error}) {
  try {
    const Data = yield call(axios.get, jobinvitesApi, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: REFRESH_JOBS_INVITE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: REFRESH_JOBS_INVITE_FAIL});
    }
  } catch (error) {
    yield put({type: REFRESH_JOBS_INVITE_FAIL});
  }
}

function* onallRequested({token, success, error}) {
  try {
    const Data = yield call(axios.get, jobinvitesApi, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: JOBS_INVITE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: JOBS_INVITE_FAIL});
    }
  } catch (error) {
    yield put({type: JOBS_INVITE_FAIL});
  }
}

function* onallnextRequested({token, success, pageno, error}) {
  try {
    const Data = yield call(axios.get, `${jobinvitesApi}?page=${pageno}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: NEXT_JOBS_INVITE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: NEXT_JOBS_INVITE_FAIL});
    }
  } catch (error) {
    yield put({type: NEXT_JOBS_INVITE_FAIL});
  }
}

function* sagaLogin() {
  yield takeEvery(JOBS_INVITE_REQUEST, onallRequested);
  yield takeEvery(NEXT_JOBS_INVITE_REQUEST, onallnextRequested);
  yield takeEvery(REFRESH_JOBS_INVITE_REQUEST, onallrefreshRequested);
  yield takeEvery(JOB_REJECT_INVITE_REQUEST, onrejectRequested);
  yield takeEvery(JOB_ACCEPT_INVITE_REQUEST, onacceptRequested);
}
export default sagaLogin;
