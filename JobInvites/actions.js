import {
  JOBS_INVITE_FAIL,
  JOBS_INVITE_REQUEST,
  JOBS_INVITE_SUCCESS,
  NEXT_JOBS_INVITE_FAIL,
  NEXT_JOBS_INVITE_REQUEST,
  NEXT_JOBS_INVITE_SUCCESS,
  REFRESH_JOBS_INVITE_FAIL,
  REFRESH_JOBS_INVITE_REQUEST,
  REFRESH_JOBS_INVITE_SUCCESS,
  UPDATE_PAGE,
  JOB_REJECT_INVITE_FAIL,
  JOB_REJECT_INVITE_REQUEST,
  JOB_REJECT_INVITE_SUCCESS,
  JOB_ACCEPT_INVITE_FAIL,
  JOB_ACCEPT_INVITE_REQUEST,
  JOB_ACCEPT_INVITE_SUCCESS,
} from './constants';
export const acceptRequest = (
  token,
  success,
  id,
  vid,
  successOne,
  successTwo,
) => ({
  type: JOB_ACCEPT_INVITE_REQUEST,
  token,
  success,
  id,
  vid,
  successOne,
  successTwo,
});

export const acceptSuccess = () => ({
  type: JOB_ACCEPT_INVITE_SUCCESS,
});
export const acceptFail = error => ({
  type: JOB_ACCEPT_INVITE_FAIL,
  error,
});
export const rejectinviteRequest = (
  token,
  success,
  id,
  successOne,
  successTwo,
) => ({
  type: JOB_REJECT_INVITE_REQUEST,
  token,
  success,
  id,
  successOne,
  successTwo,
});

export const rejectinviteSuccess = () => ({
  type: JOB_REJECT_INVITE_SUCCESS,
});
export const rejectinviteFail = error => ({
  type: JOB_REJECT_INVITE_FAIL,
  error,
});

export const updatepage = pageno => ({
  type: UPDATE_PAGE,
  pageno,
});

export const jobinviteRequest = (token, success) => ({
  type: JOBS_INVITE_REQUEST,
  token,
  success,
});

export const jobinviteSuccess = () => ({
  type: JOBS_INVITE_SUCCESS,
});
export const jobinviteFail = error => ({
  type: JOBS_INVITE_FAIL,
  error,
});

export const nextjobinviteRequest = (token, success, pageno) => ({
  type: NEXT_JOBS_INVITE_REQUEST,
  token,
  success,
  pageno,
});

export const nextjobinviteSuccess = () => ({
  type: NEXT_JOBS_INVITE_SUCCESS,
});
export const nextjobinviteFail = error => ({
  type: NEXT_JOBS_INVITE_FAIL,
  error,
});

export const refreshjobinviteRequest = (token, success) => ({
  type: REFRESH_JOBS_INVITE_REQUEST,
  token,
  success,
});

export const refreshjobinviteSuccess = () => ({
  type: REFRESH_JOBS_INVITE_SUCCESS,
});
export const refreshjobinviteFail = error => ({
  type: REFRESH_JOBS_INVITE_FAIL,
  error,
});
