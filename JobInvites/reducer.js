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

const INITIAL_STATE = {
  loading: false,
  error: null,
  footer: false,
  pageno: 0,
  refreshing: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        pageno: action.pageno,
      };
    case JOB_ACCEPT_INVITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOB_ACCEPT_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case JOB_ACCEPT_INVITE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case JOB_REJECT_INVITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOB_REJECT_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case JOB_REJECT_INVITE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REFRESH_JOBS_INVITE_REQUEST:
      return {
        ...state,
        refreshing: true,
      };
    case REFRESH_JOBS_INVITE_SUCCESS:
      return {
        ...state,
        refreshing: false,
      };
    case REFRESH_JOBS_INVITE_FAIL:
      return {
        ...state,
        refreshing: false,
      };
    case JOBS_INVITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOBS_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case JOBS_INVITE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case NEXT_JOBS_INVITE_REQUEST:
      return {
        ...state,
        footer: true,
      };
    case NEXT_JOBS_INVITE_SUCCESS:
      return {
        ...state,
        footer: false,
      };
    case NEXT_JOBS_INVITE_FAIL:
      return {
        ...state,
        footer: false,
      };
    default:
      return state;
  }
};
