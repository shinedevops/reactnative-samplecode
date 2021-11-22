import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  EDIT_CIMAGE_FAIL,
  EDIT_CIMAGE_REQUEST,
  EDIT_CIMAGE_SUCCESS,
} from './constants';

export const ProfiledetailRequest = (token, success) => ({
  type: PROFILE_REQUEST,
  token,
  success,
});

export const ProfiledetailSuccess = () => ({
  type: PROFILE_SUCCESS,
});
export const ProfiledetailFail = error => ({
  type: PROFILE_FAIL,
  error,
});

export const editimageRequest = (token, success, image, data) => ({
  type: EDIT_CIMAGE_REQUEST,
  token,
  success,
  image,
  data,
});

export const editimageSuccess = () => ({
  type: EDIT_CIMAGE_SUCCESS,
});
export const editimageFail = error => ({
  type: EDIT_CIMAGE_FAIL,
  error,
});
