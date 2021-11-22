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
    case JOBS_COMPLETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOBS_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case JOBS_COMPLETE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case NEXT_JOBS_COMPLETE_REQUEST:
      return {
        ...state,
        footer: true,
      };
    case NEXT_JOBS_COMPLETE_SUCCESS:
      return {
        ...state,
        footer: false,
      };
    case NEXT_JOBS_COMPLETE_FAIL:
      return {
        ...state,
        footer: false,
      };
    case REFRESH_JOBS_COMPLETE_REQUEST:
      return {
        ...state,
        refreshing: true,
      };
    case REFRESH_JOBS_COMPLETE_SUCCESS:
      return {
        ...state,
        refreshing: false,
      };
    case REFRESH_JOBS_COMPLETE_FAIL:
      return {
        ...state,
        refreshing: false,
      };
    default:
      return state;
  }
};
