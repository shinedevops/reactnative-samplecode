import {takeEvery, put, call} from 'redux-saga/effects';
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  EDIT_CIMAGE_REQUEST,
  EDIT_CIMAGE_SUCCESS,
  EDIT_CIMAGE_FAIL,
} from './constants';
import axios from 'axios';
import {Platform} from 'react-native';
import {profiledetailApi, editprofiledetailApi} from '../../utils/api';

function* onallRequested({token, success, error}) {
  try {
    const Data = yield call(axios.get, profiledetailApi, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (Data.data.response.success === true) {
      yield put({type: PROFILE_SUCCESS});
      success(Data.data.response.data, '1');
    } else {
      yield put({type: PROFILE_FAIL});
      success('', '2');
    }
  } catch (error) {
    console.log(error);
    yield put({type: PROFILE_FAIL});
    success('', '2');
  }
}

function* onpicRequested({token, success, image, data, error}) {
  try {
    const date = new Date();
    const one =
      Platform.OS === 'android'
        ? Math.floor(date.getTime() + date.getSeconds() / 2) +
          image.path.substring(image.path.lastIndexOf('/') + 1)
        : image.filename;
    const formdata = new FormData();
    formdata.append('first_name', data.first_name);
    formdata.append('last_name', data.last_name);
    formdata.append('mobile', data.user_detail.mobile.split('-').join(''));
    formdata.append('id_number', data.user_detail.id_number);
    // formdata.append('experience', data.user_detail.experience);
    formdata.append('address', data.user_detail.address);
    formdata.append('prefered_areas', data.user_detail.prefered_areas);
    formdata.append('carrier_photo', {
      uri: `${Platform.OS === 'ios' ? image.sourceURL : image.path}`,
      type: `${image.mime}`,
      name: `${one}`,
    });

    const Data = yield call(axios.post, editprofiledetailApi, formdata, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(Data.data);
    if (Data.data.response.success === true) {
      yield put({type: EDIT_CIMAGE_SUCCESS});
      success(Data.data.response.message);
    } else {
      yield put({type: EDIT_CIMAGE_FAIL});
      success(Data.data.response.message);
    }
  } catch (error) {
    if (error.response) {
      yield put({type: EDIT_CIMAGE_FAIL});
      success(error.response.data.message);
    } else if (error.request) {
      yield put({type: EDIT_CIMAGE_FAIL});
      success(error.toString());
    } else {
      yield put({type: EDIT_CIMAGE_FAIL});
      success('something went wrong !');
    }
  }
}

function* sagaLogin() {
  yield takeEvery(PROFILE_REQUEST, onallRequested);
  yield takeEvery(EDIT_CIMAGE_REQUEST, onpicRequested);
}
export default sagaLogin;
