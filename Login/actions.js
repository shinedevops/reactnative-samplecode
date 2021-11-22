import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
} from './constants';

export const loginRequest = (
  email,
  password,
  success,
  devicetoken,
  devicetype,
) => ({
  type: LOGIN_REQUEST,
  email,
  password,
  success,
  devicetoken,
  devicetype,
});

export const loginSuccess = error => ({
  type: LOGIN_SUCCESS,
  error,
});
export const loginFail = error => ({
  type: LOGIN_FAIL,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
