import {FORGOT_FAIL, FORGOT_REQUEST, FORGOT_SUCCESS} from './constants';

export const forgotRequest = (email, success) => ({
  type: FORGOT_REQUEST,
  email,
  success,
});

export const forgotSuccess = error => ({
  type: FORGOT_SUCCESS,
  error,
});
export const forgotFail = error => ({
  type: FORGOT_FAIL,
  error,
});
