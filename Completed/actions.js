import {
  JOBS_COMPLETE_FAIL,
  JOBS_COMPLETE_REQUEST,
  JOBS_COMPLETE_SUCCESS,
  REFRESH_JOBS_COMPLETE_FAIL,
  REFRESH_JOBS_COMPLETE_REQUEST,
  REFRESH_JOBS_COMPLETE_SUCCESS,
  NEXT_JOBS_COMPLETE_FAIL,
  NEXT_JOBS_COMPLETE_REQUEST,
  NEXT_JOBS_COMPLETE_SUCCESS,
  UPDATE_PAGE,
} from './constants';

export const updatepage = pageno => ({
  type: UPDATE_PAGE,
  pageno,
});

export const jobcompleteRequest = (token, success) => ({
  type: JOBS_COMPLETE_REQUEST,
  token,
  success,
});

export const jobcompleteSuccess = () => ({
  type: JOBS_COMPLETE_SUCCESS,
});
export const jobcompleteFail = error => ({
  type: JOBS_COMPLETE_FAIL,
  error,
});

export const nextjobcompleteRequest = (token, success, pageno) => ({
  type: NEXT_JOBS_COMPLETE_REQUEST,
  token,
  success,
  pageno,
});

export const nextjobcompleteSuccess = pageno => ({
  type: NEXT_JOBS_COMPLETE_SUCCESS,
  pageno,
});
export const nextjobcompleteFail = error => ({
  type: NEXT_JOBS_COMPLETE_FAIL,
  error,
});

export const refreshjobcompleteRequest = (token, success) => ({
  type: REFRESH_JOBS_COMPLETE_REQUEST,
  token,
  success,
});

export const refreshjobcompleteSuccess = () => ({
  type: REFRESH_JOBS_COMPLETE_SUCCESS,
});
export const refreshjobcompleteFail = error => ({
  type: REFRESH_JOBS_COMPLETE_FAIL,
  error,
});
