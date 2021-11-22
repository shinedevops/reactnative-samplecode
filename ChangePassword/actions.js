import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from './constants';

export const updatepasswordRequest = (token, oldpass, newpass, success) => ({
  type: UPDATE_PASSWORD_REQUEST,
  token,
  oldpass,
  newpass,
  success,
});

export const updatepasswordSuccess = error => ({
  type: UPDATE_PASSWORD_SUCCESS,
  error,
});
export const updatepasswordFail = error => ({
  type: UPDATE_PASSWORD_FAIL,
  error,
});
