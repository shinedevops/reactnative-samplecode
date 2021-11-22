import {takeEvery, put, call} from 'redux-saga/effects';
import {
  JOBS_COMPLETE_REQUEST,
  JOBS_COMPLETE_SUCCESS,
  JOBS_COMPLETE_FAIL,
  REFRESH_JOBS_COMPLETE_FAIL,
  REFRESH_JOBS_COMPLETE_REQUEST,
  REFRESH_JOBS_COMPLETE_SUCCESS,
  NEXT_JOBS_COMPLETE_FAIL,
  NEXT_JOBS_COMPLETE_REQUEST,
  NEXT_JOBS_COMPLETE_SUCCESS,
} from './constants';
import axios from 'axios';
import {completedjobsApi, appliedjobsApi} from '../../utils/api';

function* onallRequested({token, success, error}) {
  try {
    const Data = yield call(axios.get, completedjobsApi, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: JOBS_COMPLETE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: JOBS_COMPLETE_FAIL});
    }
  } catch (error) {
    yield put({type: JOBS_COMPLETE_FAIL});
  }
}

function* onallnextRequested({token, success, pageno, error}) {
  try {
    const Data = yield call(axios.get, `${completedjobsApi}?page=${pageno}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: NEXT_JOBS_COMPLETE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: NEXT_JOBS_COMPLETE_FAIL});
    }
  } catch (error) {
    yield put({type: NEXT_JOBS_COMPLETE_FAIL});
  }
}

function* onallrefreshRequested({token, success, error}) {
  try {
    const Data = yield call(axios.get, completedjobsApi, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.status === 200) {
      yield put({type: REFRESH_JOBS_COMPLETE_SUCCESS});
      success(Data.data.data);
    } else {
      yield put({type: REFRESH_JOBS_COMPLETE_FAIL});
    }
  } catch (error) {
    yield put({type: REFRESH_JOBS_COMPLETE_FAIL});
  }
}

function* sagaLogin() {
  yield takeEvery(JOBS_COMPLETE_REQUEST, onallRequested);
  yield takeEvery(NEXT_JOBS_COMPLETE_REQUEST, onallnextRequested);
  yield takeEvery(REFRESH_JOBS_COMPLETE_REQUEST, onallrefreshRequested);
}
export default sagaLogin;
